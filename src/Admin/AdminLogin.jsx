  import { useState } from "react";
  import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Avatar,
    Container,
  } from "@mui/material";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import axios from "axios";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";

  const AdminLogin = () => {
    const baseUrl=import.meta.env.VITE_BASE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const submitHandler = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/api/admin/adminlogin`,
          { email, password }
        );
        if (response.status === 200) {
          console.log(response.data);
          toast.success(response.data.message || "Successful login");
          const token = response.data.token;
          nav("/adminhome");
          localStorage.setItem("token", token);
          console.log(token);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    };

    return (
      <Container
        component="main"
        maxWidth={false} 
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0", 
          px: 2, 
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            width: "100%", 
            maxWidth: "400px", 
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitHandler}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  };

  export default AdminLogin;
