import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Event as EventIcon,
  Store as StoreIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const drawerWidth = 240;

const AdminHome = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();  // Initialize useNavigate
  const [data, setData] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalOwners: 0,
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Bookings",
        data: [],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1, 
      },
    ],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingResponse, userResponse, ownerResponse, chartsResponse] =
          await Promise.all([
            axios.get(`${baseUrl}/api/admin/adminviewallbookings`),
            axios.get(`${baseUrl}/api/admin/adminuserview`),
            axios.get(`${baseUrl}/api/admin/adminownerview`),
            axios.get(`${baseUrl}/api/admin/adminviewchart`),
          ]);

        // Extract length of arrays
        const totalBookings = bookingResponse.data.data.length;
        const totalUsers = userResponse.data.data.length;
        const totalOwners = ownerResponse.data.data.length;

        // Handle chart data
        const chartDataArray = chartsResponse.data.data;
        if (!Array.isArray(chartDataArray) || chartDataArray.length === 0) {
          throw new Error("Chart data is missing or not an array");
        }
        const labels = chartDataArray.map((item) => `Month ${item.month}`);
        const dataPoints = chartDataArray.map((item) => item.totalBookings);

        setData({
          totalBookings: totalBookings,
          totalUsers: totalUsers,
          totalOwners: totalOwners,
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Total Bookings",
              data: dataPoints,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const drawerContent = (handleDrawerToggle, navigate) => (
    <div>
      <Typography
        variant="h6"
        sx={{ p: 2, backgroundColor: "#3f51b5", color: "#fff", fontWeight: "bold" }}
      >
        Admin Dashboard
      </Typography>
      <Button
        startIcon={<HomeIcon />}
        onClick={() => {
          navigate("/adminhome");
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#e8eaf6",
          },
        }}
      >
        Home
      </Button>
      <Button
        startIcon={<ShoppingCartIcon />}
        onClick={() => {
          navigate("/owners");
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#e8eaf6",
          },
        }}
      >
        Owners
      </Button>
      <Button
        startIcon={<PeopleIcon />}
        onClick={() => {
          navigate("/users");
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#e8eaf6",
          },
        }}
      >
        Users
      </Button>
      <Button
        startIcon={<LogoutIcon />}
        onClick={() => {
          localStorage.removeItem('Admin_token');
          navigate("/"); 
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#e8eaf6",
          },
        }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar drawerContent={drawerContent} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #3f51b5 30%, #ff4081 90%)",
                      color: "#fff",
                    }}
                  >
                    <PersonIcon style={{ fontSize: 30 }} />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h5" component="div">
                      {data.totalUsers}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #f50057 30%, #ff4081 90%)",
                      color: "#fff",
                    }}
                  >
                    <StoreIcon style={{ fontSize: 30 }} />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" gutterBottom>
                      Total Owners
                    </Typography>
                    <Typography variant="h5" component="div">
                      {data.totalOwners}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #00c853 30%, #b2ff59 90%)",
                      color: "#fff",
                    }}
                  >
                    <EventIcon style={{ fontSize: 30 }} />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" gutterBottom>
                      Total Bookings
                    </Typography>
                    <Typography variant="h5" component="div">
                      {data.totalBookings}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Bookings Overview
                </Typography>
                <Line data={chartData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminHome;
