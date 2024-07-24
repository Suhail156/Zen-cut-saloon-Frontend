import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { CheckCircle, Close } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import axios from "axios";

const drawerWidth = 240;

const Owner = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3205/api/admin/adminownerview"
        );
        setUsers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.post(`http://localhost:3205/api/admin/approve/${userId}`);
      // Update users state or refetch users
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post(`http://localhost:3205/api/admin/reject/${userId}`);
      // Update users state or refetch users
    } catch (error) {
      console.log(error);
    }
  };

  const drawerContent = (handleDrawerToggle, navigate) => (
    <div>
      <Typography
        variant="h6"
        sx={{ p: 2, backgroundColor: "#3f51b5", color: "#fff" }}
      >
        Admin Dashboard
      </Typography>
      <Button
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
            User Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Shopname</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.shopname}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>
                      <Tooltip title="Approve">
                        <IconButton
                          color="success"
                          onClick={() => handleApprove(user._id)}
                          sx={{
                            marginRight: 1,
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton
                          color="error"
                          onClick={() => handleReject(user._id)}
                          sx={{
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default Owner;
