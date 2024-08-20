import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const BookingDetailes = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalBookings, setTotalBookings] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/admin/adminviewbooking/${id}`
        );
        const bookingData = response.data.data.booking || [];
        setData(bookingData);
        setTotalBookings(bookingData.length);
        setFilteredData(bookingData);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    let filtered = data;

    if (selectedMonth) {
      filtered = filtered.filter((user) => {
        const bookingMonth = new Date(user.date).toLocaleString("default", { month: "short" });
        return bookingMonth === selectedMonth;
      });
    }

    if (startDate && endDate) {
      filtered = filtered.filter((user) => {
        const bookingDate = new Date(user.date);
        return bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
  }, [selectedMonth, startDate, endDate, data]);

  const goBack = () => {
    navigate("/owners");
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={goBack}
        sx={{
          mb: 2,
          borderRadius: "20px",
          textTransform: "none",
          padding: "8px 20px",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "#004ba0",
            boxShadow: 6,
          },
        }}
      >
        Back to Owners
      </Button>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Bookings: {totalBookings}
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Filter by Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filter by Date Range
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </Box>
      {filteredData.length === 0 ? (
        <Box sx={{ textAlign: "center", padding: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No bookings available.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Username</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Time</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user, index) => {
                const dates = new Date(user.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{dates}</TableCell>
                    <TableCell>{user.startTime}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default BookingDetailes;
