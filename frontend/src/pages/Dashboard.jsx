import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#f44336"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  if (!stats) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h6" color="error">Error loading stats. Please try again later.</Typography>
    </Box>
  );

  // Pie chart data
  const vaccinationData = [
    { name: "Vaccinated", value: stats.students.vaccinated },
    { name: "Not Vaccinated", value: stats.students.total - stats.students.vaccinated }
  ];

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      {/* Container for Pie Chart and Cards */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Donut Chart */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h6" align="center" sx={{ marginBottom: '2' }}>Vaccination Stats</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={vaccinationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {vaccinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Cards */}
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#2196F3", color: "white", '&:hover': { backgroundColor: "#1976D2" } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Students</Typography>
              <Typography variant="h5">{stats.students.total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#4CAF50", color: "white", '&:hover': { backgroundColor: "#388E3C" } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Vaccinated</Typography>
              <Typography variant="h5">{stats.students.vaccinated}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#FF9800", color: "white", '&:hover': { backgroundColor: "#F57C00" } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Vaccination %</Typography>
              <Typography variant="h5">{stats.students.vaccinatedPercentage}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#9C27B0", color: "white", '&:hover': { backgroundColor: "#7B1FA2" } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Upcoming Drives</Typography>
              <Typography variant="h5">{stats.upcomingDrives.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
