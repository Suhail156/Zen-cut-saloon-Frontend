import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import SideNavbar from "./SideNavbar";

const BookingPending = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/shopowner/ownerviewpending/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // Handle accept booking
  const handleAccept = async (bookingId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/shopowner/owneraccept/${bookingId}`
      );
      toast.success("Booking accepted successfully!"); 
      setData(
        data.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "accepted" }
            : booking
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept booking."); 
    }
  };

  // Handle reject booking
  const handleReject = async (bookingId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/shopowner/ownerreject/${bookingId}`
      );
      toast.success("Booking rejected successfully!"); // Show success toast
      setData(
        data.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "rejected" }
            : booking
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject booking."); 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#e0e0e0"
      }}
    >
      {" "}
      <SideNavbar />
      <Box className="container mx-auto bg-grey p-4 rounded-lg shadow-lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    S.No
                  </Typography>
                </TableCell>
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
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="h6">No booking information</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((booking, index) => {
                  const formattedDate = new Date(
                    booking.date
                  ).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{booking.username}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{booking.startTime}</TableCell>
                      <TableCell>
                        {booking.status === "pending" ? (
                          <>
                            <Button
                              variant="contained"
                              startIcon={<CheckIcon />}
                              sx={{
                                marginRight: 1,
                                backgroundColor: "green",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "darkgreen",
                                },
                                borderRadius: "20px",
                                padding: "8px 16px",
                              }}
                              onClick={() => handleAccept(booking._id)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              startIcon={<CloseIcon />}
                              sx={{
                                backgroundColor: "red",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "darkred",
                                },
                                borderRadius: "20px",
                                padding: "8px 16px",
                              }}
                              onClick={() => handleReject(booking._id)}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Typography variant="subtitle2">
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </Typography>
                        )}
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

export default BookingPending;
