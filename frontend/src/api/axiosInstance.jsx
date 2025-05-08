// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
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
