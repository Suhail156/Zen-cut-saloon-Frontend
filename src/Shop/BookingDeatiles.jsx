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
} from "@mui/material";
import SideNavbar from "./SideNavbar";

const BookingDetailses = () => {
  const [users, setUsers] = useState([]);
  const ownerId = localStorage.getItem("ownerId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/shopowner/ownerviewbookings/${ownerId}`
        );
        setUsers(response.data.data.booking);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [ownerId]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <SideNavbar />
      <Box className="container mx-auto bg-white p-4 rounded-lg shadow-lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Details
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6">No booking information</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => {
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
