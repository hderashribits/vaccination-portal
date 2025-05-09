// src/pages/GenerateReport.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Button, TextField, MenuItem, Typography, Paper, TableContainer,
  Table, TableHead, TableRow, TableCell, TableBody, TablePagination
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { getAllStudents } from '../api/studentApi';
import { getVaccinationNames } from '../api/driveApi';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

function GenerateReport() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [vaccineFilter, setVaccineFilter] = useState('');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');
  const [vaccineOptions, setVaccineOptions] = useState([]);

  const fetchVaccineOptions = async () => {
    try {
      const names = await getVaccinationNames();
      setVaccineOptions(names);
    } catch (err) {
      console.error('Failed to fetch vaccine options:', err.message);
    }
  };  

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      const data = res.data || res;
      setStudents(data);
    } catch (err) {
      console.error('Failed to fetch students:', err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchVaccineOptions();
  }, []);

  const handleGenerate = () => {
    const filteredData = students.filter((s) => {
      const vacDate = s.vaccinationDate ? dayjs(s.vaccinationDate) : null;
      return (
        (!vaccineFilter || s.vaccineName === vaccineFilter) &&
        (!vacDate || (vacDate.isAfter(startDate) && vacDate.isBefore(endDate)))
      );
    });
    setFiltered(filteredData);
    setPage(0);
  };

  const downloadCSV = () => {
    const csvData = filtered.map(s => ({
      Name: s.name,
      RollNo: s.rollNo,
      Vaccine: s.vaccineName || '',
      Status: s.vaccinated ? 'Done' : 'Pending',
      Date: s.vaccinationDate ? dayjs(s.vaccinationDate).format('YYYY-MM-DD') : ''
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'vaccination_report.csv');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Generate Vaccination Report
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          select
          label="Vaccine"
          value={vaccineFilter}
          onChange={(e) => setVaccineFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          {vaccineOptions.map((vaccine) => (
            <MenuItem key={vaccine} value={vaccine}>
              {vaccine}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={downloadCSV}
          startIcon={<DownloadIcon />}
        >
          Download CSV
        </Button>
      </Box>

      {filtered.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Roll Number</b></TableCell>
                <TableCell><b>Vaccine</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Date</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow key={student.rollNo}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.vaccineName || '-'}</TableCell>
                  <TableCell>{student.vaccinated ? 'Done' : 'Pending'}</TableCell>
                  <TableCell>{student.vaccinationDate ? dayjs(student.vaccinationDate).format('YYYY-MM-DD') : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </TableContainer>
      )}
    </Box>
  );
}

export default GenerateReport;
