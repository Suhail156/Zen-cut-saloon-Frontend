import SideNavbar from "./SideNavbar";
import OwnerNavbar from "../OwnerNavbar";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FaListAlt, FaCalendarDay } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

const ShopHome = () => {
  const [bookings, setBookings] = useState([]);
  const ownerId = localStorage.getItem("ownerId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/shopowner/ownerviewbookings/${ownerId}`
        );
        const sortedBookings = response.data.data.booking.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setBookings(sortedBookings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, [ownerId]);

  const statistics = {
    totalOrders: bookings.length,
    todayOrders: bookings.filter(
      (booking) =>
        new Date(booking.date).toDateString() === new Date().toDateString()
    ).length,
  };

  const todayBookings = bookings.filter(
    (booking) =>
      new Date(booking.date).toDateString() === new Date().toDateString()
  );

  return (
    <>
      <OwnerNavbar />
      <div className="flex h-screen">
        <SideNavbar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, bgcolor: "#f5f5f5" }}>
            <Container>
              <Typography
                variant="h4"
                gutterBottom
                color="primary"
                sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}
              >
                Welcome to Home
              </Typography>

              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: { xs: 2, md: 3 },
                      boxShadow: 3,
                      minHeight: 150,
                    }}
                  >
                    <FaListAlt size={40} color="#3f51b5" />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                      >
                        Total Orders
                      </Typography>
                      <Typography
                        variant="h4"
                        color="text.primary"
                        sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                      >
                        {statistics.totalOrders}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: { xs: 2, md: 3 },
                      boxShadow: 3,
                      minHeight: 150,
                    }}
                  >
                    <FaCalendarDay size={40} color="#3f51b5" />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                      >
                        Today’s Orders
                      </Typography>
                      <Typography
                        variant="h4"
                        color="text.primary"
                        sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                      >
                        {statistics.todayOrders}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography
                variant="h5"
                gutterBottom
                color="primary"
                sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
              >
                Today’s Bookings
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
                      >
                        Time
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell
                          sx={{
                            fontSize: { xs: "0.8rem", md: "1rem" },
                          }}
                        >
                          {new Date(booking.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: { xs: "0.8rem", md: "1rem" },
                          }}
                        >
                          {booking.username}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: { xs: "0.8rem", md: "1rem" },
                          }}
                        >
                          {booking.phone}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: { xs: "0.8rem", md: "1rem" },
                          }}
                        >
                          {booking.startTime}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: { xs: "0.8rem", md: "1rem" },
                          }}
                        >
                          {booking.status} {/* Display status */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ShopHome;
