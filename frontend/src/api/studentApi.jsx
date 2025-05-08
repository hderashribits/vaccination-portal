// src/api/studentApi.js
import axios from './axiosInstance';

export const addStudent = async (student) =>
  axios.post('api/students', student);

export const getAllStudents = async () =>
  axios.get('api/students');

export const updateStudent = (rollNo, data) => axios.put(`api/students/${rollNo}`, data);
export const deleteStudent = (rollNo) => axios.delete(`api/students/${rollNo}`);

export const uploadStudentsCSV = async (formData) =>
  axios.post('api/csv-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
