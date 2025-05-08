// src/api/dashboardApi.js
import axios from "./axiosInstance";

export const getDashboardStats = async () => {
  const res = await axios.get("/api/dashboard");
  return res.data;
};
