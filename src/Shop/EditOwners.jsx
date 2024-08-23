import { Button, TextField, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditOwners = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopname: "",
    username: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/shopowner/ownerviewbyid/${id}`
        );
        const ownerData = response.data.data;
        if (ownerData) {
          setFormData({
            shopname: ownerData.shopname,
            username: ownerData.username,
            phone: ownerData.phone,
            email: ownerData.email,
          });
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${baseUrl}/api/shopowner/owneredit/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      navigate(`/ownerprofile/${id}`);
      console.log(response);
    } catch (error) {
      console.log("Error updating owner:", error);
      toast.error("Failed to update owner. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, ml: 45 }}>
        Edit Owner
      </Typography>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shop Name"
              name="shopname"
              value={formData.shopname}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/shophome")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditOwners;
