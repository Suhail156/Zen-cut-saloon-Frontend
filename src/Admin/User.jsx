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
import { Block, Done } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

const drawerWidth = 240;

const User = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/admin/adminuserview`
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
        `${baseUrl}/api/admin/adminblock/${id}`
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
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar drawerContent={drawerContent} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "grey.100", // Set background color to grey
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
                      <Tooltip
                        title={user.blocked ? "Unblock User" : "Block User"}
                      >
                        <IconButton
                          color={user.blocked ? "error" : "success"}
                          onClick={() => toggleBlockUser(user._id)}
                          sx={{
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            bgcolor: user.blocked
                              ? "error.main"
                              : "success.main",
                            "&:hover": {
                              bgcolor: user.blocked
                                ? "error.dark"
                                : "success.dark",
                            },
                            color: "#fff",
                            boxShadow: 3,
                            transition: "transform 0.2s",
                          }}
                        >
                          {user.blocked ? <Done /> : <Block />}
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

export default User;
