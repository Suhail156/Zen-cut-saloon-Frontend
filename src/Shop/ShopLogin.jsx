import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Box, Grid, Typography, Paper } from "@mui/material";

const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3205/api/shopowner/ownerlogin",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.data.message || "Successful login");
        const token = response.data.data.token;
        const ownername = response.data.data.username;
        const ownerId = response.data.data._id;
        localStorage.setItem("token", token);
        localStorage.setItem("name", ownername);
        localStorage.setItem("ownerId", ownerId);
        nav("/shophome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333",
      }}
    >
      <Grid container sx={{ maxWidth: 900 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              width: "100%",
              backgroundColor: "white",
              color: "white",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "black" }}
            >
              Login into your account
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: "#aaa" },
                }}
                InputProps={{
                  style: { color: "black" },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  style: { color: "#aaa" },
                }}
                InputProps={{
                  style: { color: "black" },
                }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <input
                    type="checkbox"
                    id="remember"
                    style={{ marginRight: 8 }}
                  />
                  <label htmlFor="remember" style={{ color: "#aaa" }}>
                    Remember me
                  </label>
                </Box>
                <Link to="#" style={{ color: "#aaa" }}>
                  Forgot password?
                </Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="my-4 mt-4"
                sx={{ backgroundColor: "black", color: "white", marginTop: 2 }}
              >
                Login
              </Button>
            </form>
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography variant="body1" style={{ marginRight: 8 }}>
                or login with
              </Typography>
            </Box>
            <Typography variant="h6" align="center">
              Dont have an account?{" "}
              <Link to={"/shopsignup"} style={{ color: "#1e90ff" }}>
                Register here
              </Link>
            </Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url('https://i.pinimg.com/564x/e5/b5/51/e5b551c61de65197ed1e3e15ce628511.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "150px", md: "67.5vh" },
          }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default ShopLogin;
