// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageStudents from "./pages/ManageStudents";
import GenerateReport from "./pages/GenerateReport";
import VaccinationDrive from "./pages/VaccinationDrive";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ px: 2, py: 2, width: "100%", maxWidth: "100%" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-students"
            element={
              <ProtectedRoute>
                <ManageStudents />
              </ProtectedRoute>
            }
          />
          <Route path="/generate-report" element={<GenerateReport />} />
          <Route path="/vaccination-drive" element={<VaccinationDrive />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
