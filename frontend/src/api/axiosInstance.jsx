// axiosInstance.js
import axios from 'axios';

const PORT = import.meta.env.VITE_BACKEND_PORT || 5001;

const instance = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

// Don't attach token to login or public routes
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  // Avoid attaching token to login route
  if (!config.url.includes('/auth/login') && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
