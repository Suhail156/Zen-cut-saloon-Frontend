import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Input,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
import SideNavbar from "./SideNavbar";

const ShopEdit = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    shopname: "",
    location: "",
    phone: "",
    startTime: "",
    endTime: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/shopowner/ownerviewshop/${id}`
        );
        const shopData = response.data.data.shopId[0];
        if (shopData) {
          setFormData({
            shopname: shopData.shopname || "",
            location: shopData.location || "",
            phone: shopData.phone || "",
            startTime: shopData.startTime || "",
            endTime: shopData.endTime || "",
            image: shopData.image || null,
          });
        } else {
          console.warn("No shop data found for this ID");
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = new FormData();
      updatedFormData.append("shopname", formData.shopname);
      updatedFormData.append("location", formData.location);
      updatedFormData.append("phone", formData.phone);
      updatedFormData.append("startTime", formData.startTime);
      updatedFormData.append("endTime", formData.endTime);
      if (formData.image) {
        updatedFormData.append("image", formData.image);
      }

      const response = await axios.patch(
        `http://localhost:3205/api/shopowner/ownereditshop/${id}`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      navigate(`/viewshops`);
    } catch (error) {
      console.error(
        "Error updating shop details:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating shop details.");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <SideNavbar />
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3 },
          maxWidth: { xs: "100%", sm: "600px" },
          margin: "auto",
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Edit Shop Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Shop Name"
                name="shopname"
                value={formData.shopname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Start Time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="End Time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ShopEdit;
