import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a73e8', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: 1 }}>
            Vaccination Portal
          </Typography>
          <div>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{
                marginLeft: 2,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#4CAF50', // Hover effect
                  borderRadius: '4px',
                },
              }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/manage-students"
              sx={{
                marginLeft: 2,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#4CAF50',
                  borderRadius: '4px',
                },
              }}
            >
              Manage Students
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/generate-report"
              sx={{
                marginLeft: 2,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#4CAF50',
                  borderRadius: '4px',
                },
              }}
            >
              Generate Report
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/vaccination-drive"
              sx={{
                marginLeft: 2,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#4CAF50',
                  borderRadius: '4px',
                },
              }}
            >
              Vaccination Drive
            </Button>
            {/* Logout Button */}
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                marginLeft: 2,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#f44336', // Red hover effect for logout
                  borderRadius: '4px',
                },
              }}
            >
              Logout
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
