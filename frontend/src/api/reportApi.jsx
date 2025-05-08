// src/api/reportApi.js
import axios from "./axiosInstance";

export const getVaccinationReport = async (filters) =>
  axios.get("/reports", { params: filters });

export const downloadReport = async (format = "csv") =>
  axios.get(`/reports/download?format=${format}`, {
    responseType: "blob",
  });
