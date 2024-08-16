import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Chip,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopSignup = () => {
  const [username, setUsername] = useState("");
  const [shopname, setShopname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState([]);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  const states = ["Kerala", "Karnataka", "Tamilnadu"];
  const districts = {
    Kerala: [
      "Kozhikkode",
      "Malappuram",
      "Wayanad",
      "Trissur",
      "Kannur",
      "Kasarcod",
      "Palakkad",
    ],
    Karnataka: ["District3", "District4"],
    Tamilnadu: ["District5", "District6"],
  };

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryString = category.join(",");

    try {
      const response = await axios.post(
        "http://localhost:3205/api/shopowner/ownersignup",
        {
          username,
          shopname,
          email,
          password,
          category: categoryString,
          phone,
          state,
          district,
        }
      );

      if (response.status === 201) {
        console.log(response.data.data);
        navigate("/shoplogin");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1661715150961-5ee318bdd106?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            backdropFilter: "blur(5px)",

            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            SIGN UP FOR BUSINESS
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  size="medium"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Shop Name"
                  value={shopname}
                  onChange={(e) => setShopname(e.target.value)}
                  fullWidth
                  size="medium"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  size="medium"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  size="medium"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  size="medium"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="medium" variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    multiple
                    value={category}
                    onChange={handleChangeCategory}
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          justifyContent: "flex-end",
                        }}
                      >
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="haircut">Haircut</MenuItem>
                    <MenuItem value="facial">Facial</MenuItem>
                    <MenuItem value="beard">Beard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="medium" variant="outlined">
                  <InputLabel>State</InputLabel>
                  <Select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {states.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="medium" variant="outlined">
                  <InputLabel>District</InputLabel>
                  <Select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!state}
                  >
                    {state &&
                      districts[state].map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    px: 5,
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "darkgray",
                      color: "black",
                      fontWeight: "600",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ShopSignup;
