// src/api/driveApi.js
import axios from "./axiosInstance";

export const createDrive = async (formData) => {
  const res = await axios.post('/api/drives', formData);
  return res.data;
};

export const getAllDrives = async () => {
  const res = await axios.get('/api/drives');
  return res.data;
};

export const updateDrive = async (id, newData) => {
  const res = await axios.put(`/api/drives/${id}`, newData); // Pass ID in the URL
  return res.data;
};

export const deleteDrive = async (drive) => {
  const { vaccineName, date } = drive;
  const res = await axios.delete('/api/drives', { data: { vaccineName, date } });
  return res.data;
};

export const getVaccinationNames = async () => {
  const res = await axios.get('/api/drives/vaccinationNames');
  return res.data;
};
