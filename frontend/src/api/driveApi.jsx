// src/api/driveApi.js
import axios from "./axiosInstance";

export const createVaccinationDrive = async (data) =>
  axios.post("/drives", data);

export const getAllDrives = async () => axios.get("/drives");

export const updateDrive = async (id, data) =>
  axios.put(`/drives/${id}`, data);
