import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Box, MenuItem, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createDrive, getAllDrives, updateDrive, deleteDrive } from '../api/driveApi';
import DeleteIcon from '@mui/icons-material/Delete';

const classOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

function VaccinationDrive() {
  const [formData, setFormData] = useState({
    vaccineName: '',
    date: '',
    availableDoses: '',
    applicableClasses: [],
  });

  const [drives, setDrives] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchDrives = async () => {
    try {
      const data = await getAllDrives();
      setDrives(data);
    } catch (error) {
      toast.error('Failed to fetch drives');
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'applicableClasses') {
      setFormData({
        ...formData,
        [name]: typeof value === 'string' ? value.split(',') : value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const commonPayload = {
      vaccineName: formData.vaccineName,
      date: formData.date,
      availableDoses: parseInt(formData.availableDoses, 10),
      applicableClasses: formData.applicableClasses,
    };
  
    try {
      if (isEditing) {
        const payload = {
          id: editingId,
          newData: {
            availableDoses: commonPayload.availableDoses,
            applicableClasses: commonPayload.applicableClasses,
          },
        };
  
        await updateDrive(editingId, payload);
        toast.success('Drive updated');
      } else {
        await createDrive(commonPayload);
        toast.success('Drive created');
      }
  
      fetchDrives();
      setFormData({
        vaccineName: '',
        date: '',
        availableDoses: '',
        applicableClasses: [],
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    }
  };    

  const handleEdit = (drive) => {
    setFormData({
      vaccineName: drive.vaccineName,
      date: drive.date.split('T')[0],
      availableDoses: drive.availableDoses.toString(),
      applicableClasses: drive.applicableClasses,
    });
    setIsEditing(true);
    setEditingId(drive._id);
  };

  const handleDelete = async (drive) => {
    try {
      await deleteDrive(drive);
      toast.success('Drive deleted successfully');
      fetchDrives();
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Vaccination Drive
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, maxWidth: 500 }}>
        <TextField
          label="Vaccine Name"
          name="vaccineName"
          value={formData.vaccineName}
          onChange={handleChange}
          required
          disabled={isEditing}  // Disable the field while editing
        />

        <TextField
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
          required
          disabled={isEditing}  // Disable the field while editing
        />

        <TextField
          label="Available Doses"
          name="availableDoses"
          type="number"
          value={formData.availableDoses}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Applicable Classes"
          name="applicableClasses"
          SelectProps={{ multiple: true }}
          value={formData.applicableClasses}
          onChange={handleChange}
        >
          {classOptions.map((cls) => (
            <MenuItem key={cls} value={cls}>
              {cls}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" type="submit">
          {isEditing ? 'Update Drive' : 'Create Drive'}
        </Button>
      </Box>

      <Typography variant="h5" mt={5}>
        Upcoming Drives
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Vaccine</TableCell>
              <TableCell>Doses</TableCell>
              <TableCell>Applicable Classes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drives.map((drive) => (
              <TableRow key={drive._id}>
                <TableCell>{drive.date.split('T')[0]}</TableCell>
                <TableCell>{drive.vaccineName}</TableCell>
                <TableCell>{drive.availableDoses}</TableCell>
                <TableCell>{drive.applicableClasses.join(', ')}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(drive)}>Edit</Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(drive)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </Box>
  );
}

export default VaccinationDrive;
