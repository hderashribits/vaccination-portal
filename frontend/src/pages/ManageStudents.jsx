// src/pages/ManageStudents.jsx
import React, { useState, useEffect, useCallback} from 'react';
import {
  Container, Typography, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton
} from '@mui/material';
import { Add, UploadFile, Delete, Edit } from '@mui/icons-material';
import {
  addStudent, getAllStudents, uploadStudentsCSV,
  updateStudent, deleteStudent
} from '../api/studentApi';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  // Dialog states
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, rollNo: '' });

  const [form, setForm] = useState({
    rollNo: '', name: '', standard: '', section: '', gender: '', dob: '', email: ''
  });

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch {
      showError('Failed to fetch students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showError = (msg) => setSnack({ open: true, message: msg, severity: 'error' });
  const showSuccess = (msg) => setSnack({ open: true, message: msg, severity: 'success' });

  const handleAddSubmit = async () => {
    try {
      await addStudent(form);
      showSuccess('Student added');
      setOpenAdd(false);
      fetchStudents();
    } catch {
      showError('Add failed');
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateStudent(form.rollNo, form);
      showSuccess('Student updated');
      setOpenEdit(false);
      fetchStudents();
    } catch {
      showError('Update failed');
    }
  };

  const handleUploadCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadStudentsCSV(formData);
      showSuccess('CSV uploaded');
      setOpenUpload(false);
      fetchStudents();
    } catch {
      showError('Upload failed');
    }
  };

  const handleDelete = useCallback(async () => {
    try {
      await deleteStudent(confirmDelete.rollNo);
      showSuccess('Student deleted successfully');
      setStudents(prevStudents => prevStudents.filter(student => student.rollNo !== confirmDelete.rollNo));
    } catch (error) {
      showError('Failed to delete student');
    } finally {
      // Ensure the dialog closes after the delete action is completed
      setTimeout(() => {
        setConfirmDelete(prevState => ({
          ...prevState,
          open: false, // Close the dialog
          rollNo: ''
        }));
      }, 200); // Adjust the timeout if necessary
    }
  }, [confirmDelete.rollNo]);  
  

  const openEditDialog = (stu) => {
    setForm({
      rollNo: stu.rollNo,
      name: stu.name,
      standard: stu.standard,
      section: stu.section,
      gender: stu.gender,
      email: stu.email,
      dob: stu.dob.split('T')[0], // ISO to yyyy-mm-dd
    });
    setOpenEdit(true);
  };

  const renderFormFields = () =>
    ['rollNo', 'name', 'standard', 'section', 'gender', 'dob', 'email'].map((field) => (
      <TextField
        key={field}
        label={field.toUpperCase()}
        type={field === 'dob' ? 'date' : 'text'}
        name={field}
        value={form[field]}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        fullWidth
        margin="dense"
        InputLabelProps={field === 'dob' ? { shrink: true } : {}}
        disabled={field === 'rollNo' && openEdit}
      />
    ));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Students</Typography>

      <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAdd(true)} sx={{ mr: 2 }}>
        Add Student
      </Button>
      <Button variant="contained" color="secondary" startIcon={<UploadFile />} onClick={() => setOpenUpload(true)}>
        Upload CSV
      </Button>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell><TableCell>Name</TableCell>
            <TableCell>Class</TableCell><TableCell>Section</TableCell>
            <TableCell>Gender</TableCell><TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((stu) => (
            <TableRow key={stu._id}>
              <TableCell>{stu.rollNo}</TableCell><TableCell>{stu.name}</TableCell>
              <TableCell>{stu.standard}</TableCell><TableCell>{stu.section}</TableCell>
              <TableCell>{stu.gender}</TableCell>
              <TableCell>{stu.email}</TableCell>
              <TableCell>{new Date(stu.dob).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => openEditDialog(stu)}><Edit /></IconButton>
                <IconButton onClick={() => setConfirmDelete({ open: true, rollNo: stu.rollNo })}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>{renderFormFields()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>{renderFormFields()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Upload CSV Dialog */}
      <Dialog open={openUpload} onClose={() => setOpenUpload(false)}>
        <DialogTitle>Upload CSV</DialogTitle>
        <DialogContent>
          <input type="file" accept=".csv" onChange={handleUploadCSV} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpload(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog 
        open={confirmDelete.open} 
        onClose={() => {
          console.log("Dialog closed");
          setConfirmDelete(prevState => ({
            ...prevState,
            open: false,
            rollNo: ''
          }));
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete roll number {confirmDelete.rollNo}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            console.log("Cancel clicked");
            setConfirmDelete(prevState => ({
              ...prevState,
              open: false,
              rollNo: ''
            }));
          }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>



      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default ManageStudents;
