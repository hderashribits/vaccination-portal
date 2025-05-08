// src/api/authApi.js
import axios from './axiosInstance';

export const loginAdmin = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};
