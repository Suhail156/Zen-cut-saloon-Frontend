import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
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

const drawerWidth = 240;

const AdminHome = () => {
  const [data, setData] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalOwners: 0,
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingResponse, userResponse, ownerResponse, chartsResponse] =
          await Promise.all([
            axios.get("http://localhost:3205/api/admin/adminviewdetailes"),
            axios.get("http://localhost:3205/api/admin/adminviewallusers"),
            axios.get("http://localhost:3205/api/admin/adminviewallowners"),
            axios.get("http://localhost:3205/api/admin/adminviewchart"),
          ]);

        console.log("Chart Response:", chartsResponse);

        const chartDataArray = chartsResponse.data.data;
        if (!Array.isArray(chartDataArray) || chartDataArray.length === 0) {
          throw new Error("Chart data is missing or not an array");
        }
        const labels = chartDataArray.map((item) => `Month ${item.month}`);
        const dataPoints = chartDataArray.map((item) => item.totalBookings);

        setData({
          totalBookings: bookingResponse.data.data.totalBookings,
          totalUsers: userResponse.data.data.totalusers,
          totalOwners: ownerResponse.data.data.totalowners,
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Total Bookings",
              data: dataPoints,
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
        console.log("Error details:", error);
      }
    };

    fetchData();
  }, []);

  const drawerContent = (handleDrawerToggle, navigate) => (
    <div>
      <Typography
        variant="h6"
        sx={{ p: 2, backgroundColor: "#3f51b5", color: "#fff" }}
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
            backgroundColor: "#f1f1f1",
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
            backgroundColor: "#f1f1f1",
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
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        Users
      </Button>
      <Button
        startIcon={<LogoutIcon />}
        onClick={() => {
          navigate("/adminlogin");
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#f1f1f1",
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
          bgcolor: "background.default",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.totalUsers}
                  </Typography>
                </CardContent>
                <CardMedia>
                  <PersonIcon style={{ fontSize: 40, color: "#3f51b5" }} />
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Shop Owners
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.totalOwners}
                  </Typography>
                </CardContent>
                <CardMedia>
                  <StoreIcon style={{ fontSize: 40, color: "#f50057" }} />
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Bookings
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.totalBookings}
                  </Typography>
                </CardContent>
                <CardMedia>
                  <EventIcon style={{ fontSize: 40, color: "#4caf50" }} />
                </CardMedia>
              </Card>
            </Grid>
            {/* Sales Chart */}
            <Grid item xs={12} lg={9}>
              <Paper elevation={3} style={{ padding: "16px", height: "400px" }}>
                {" "}
                {/* Ensure height is set */}
                <Typography variant="h6">Sales Over Time</Typography>
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
