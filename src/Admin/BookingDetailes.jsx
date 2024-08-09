import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const BookingDetailes = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
   const nav=useNavigate()
  useEffect(() => {
    const fetchigDetailes = async () => {
      const response = await axios.get(`http://localhost:3205/api/admin/adminviewbooking/${id}`);
      setData(response.data.data.booking);
      console.log(response.data.data.booking);
    };
    fetchigDetailes();
  }, [id]);
 const goback=()=>{
   nav(-1)
 }
  return (
    <Container sx={{ padding: 4 }}>
        <button  onClick={goback}>Back</button>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
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
    </Container>
  );
};

export default BookingDetailes;
