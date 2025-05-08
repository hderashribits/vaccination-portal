import { useState } from 'react';
import { loginAdmin } from '../api/authApi';
import {
  Container, Typography, TextField, Button, Grid, Box, Snackbar, Alert
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginAdmin(email, password);
      localStorage.setItem('token', token); // store token
      window.location.href = '/dashboard'; // redirect
    } catch (err) {
      setError('Invalid credentials');
      setSnackOpen(true);
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Box
        sx={{
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            Login
          </Button>
        </form>

        {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}

      </Box>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
