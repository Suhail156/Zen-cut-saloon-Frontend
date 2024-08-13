import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from "@mui/material";

const BookingDetailes = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3205/api/admin/adminviewbooking/${id}`);
        setData(response.data.data.booking || []); // Ensure it's an empty array if no booking data
        console.log(response.data.data.booking);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  const goBack = () => {
    navigate('/owners');
  };

  return (
    <Container sx={{ padding: 4 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={goBack} 
        sx={{ 
          mb: 2,
          borderRadius: '20px', 
          textTransform: 'none',
          padding: '8px 20px',
          boxShadow: 3,
          '&:hover': {
            backgroundColor: '#004ba0',
            boxShadow: 6
          }
        }}
      >
        Back to Owners
      </Button>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      {data.length === 0 ? (
        <Box sx={{ textAlign: 'center', padding: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No bookings available.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Start Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user, index) => {
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
