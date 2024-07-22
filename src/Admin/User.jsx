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
} from "@mui/material";
import { Block, CheckCircle } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

const drawerWidth = 240;

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3205/api/admin/adminuserview"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const toggleBlockUser = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3205/api/admin/adminblock/${id}`
      );
      toast.success(response.data.message);

      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, blocked: !user.blocked } : user
        )
      );
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
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <IconButton
                        color={user.blocked ? "error" : "success"}
                        onClick={() => toggleBlockUser(user._id)}
                        sx={{
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          bgcolor: user.blocked ? "error.main" : "success.main",
                          "&:hover": {
                            bgcolor: user.blocked
                              ? "error.dark"
                              : "success.dark",
                          },
                        }}
                      >
                        {user.blocked ? <Block /> : <CheckCircle />}
                      </IconButton>
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

export default User;
