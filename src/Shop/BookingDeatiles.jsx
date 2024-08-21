import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SideNavbar from "./SideNavbar";
import dayjs from "dayjs";

const BookingDetailses = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const ownerId = localStorage.getItem("ownerId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/shopowner/ownerviewbookings/${ownerId}`
        );
        setUsers(response.data.data.booking);
        setFilteredUsers(response.data.data.booking);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [ownerId]);

  useEffect(() => {
    let filtered = users;

    if (selectedDate) {
      filtered = filtered.filter(user =>
        dayjs(user.date).isSame(dayjs(selectedDate), "day")
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter(user => {
        const userMonth = dayjs(user.date).format("MMM");
        return userMonth === selectedMonth;
      });
    }

    setFilteredUsers(filtered);
  }, [selectedDate, selectedMonth, users]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#e0e0e0", // Set background to light gray
      }}
    >
      <SideNavbar />
      <Box
        className="container mx-auto p-4 rounded-lg shadow-lg"
        sx={{
          backgroundColor: "#f5f5f5", // Set a slightly darker gray background for the inner container
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Details
        </Typography>

        {/* Filter by Date */}
        <TextField
          label="Filter by Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Filter by Month */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Filter by Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Filter by Month"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Jan">January</MenuItem>
            <MenuItem value="Feb">February</MenuItem>
            <MenuItem value="Mar">March</MenuItem>
            <MenuItem value="Apr">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="Jun">June</MenuItem>
            <MenuItem value="Jul">July</MenuItem>
            <MenuItem value="Aug">August</MenuItem>
            <MenuItem value="Sep">September</MenuItem>
            <MenuItem value="Oct">October</MenuItem>
            <MenuItem value="Nov">November</MenuItem>
            <MenuItem value="Dec">December</MenuItem>
          </Select>
        </FormControl>

        {/* Total Booking Count */}
        <Typography variant="h6" gutterBottom>
          Total Bookings: {filteredUsers.length}
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Username
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Start Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6">No booking information</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => {
                  const dates = new Date(user.date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{dates}</TableCell>
                      <TableCell>{user.startTime}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color:
                              user.status === "accept"
                                ? "green"
                                : user.status === "pending"
                                ? "orange"
                                : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BookingDetailses;
