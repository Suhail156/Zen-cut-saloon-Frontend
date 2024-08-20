import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faPhoneAlt,
  faEnvelope,
  faUpload,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import SideNavbar from "./SideNavbar";

const AddShop = () => {
  const navigate = useNavigate();
  const [shopDetails, setShopDetails] = useState({
    shopname: "",
    phone: "",
    email: "",
    image: null,
    category: [],
    location: "",
    startTime: "",
    endTime: "",
  });

  const categoriesList = [
    { id: "haircut", name: "Haircut" },
    { id: "facial", name: "Facial" },
    { id: "beard", name: "Beard" },
  ];

  const ownerId = localStorage.getItem("ownerId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({
      ...shopDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB.");
      return;
    }
    setShopDetails({
      ...shopDetails,
      image: file,
    });
  };

  const toggleCategory = (category) => {
    setShopDetails((prevDetails) => {
      const isSelected = prevDetails.category.find(
        (cat) => cat.id === category.id
      );
      if (isSelected) {
        return {
          ...prevDetails,
          category: prevDetails.category.filter(
            (cat) => cat.id !== category.id
          ),
        };
      } else {
        return {
          ...prevDetails,
          category: [...prevDetails.category, category],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      new Date(`1970-01-01T${shopDetails.startTime}:00`) >=
      new Date(`1970-01-01T${shopDetails.endTime}:00`)
    ) {
      toast.error("End time must be after start time.");
      return;
    }

    const formData = new FormData();
    formData.append("shopname", shopDetails.shopname);
    formData.append("phone", shopDetails.phone);
    formData.append("email", shopDetails.email);
    formData.append("image", shopDetails.image);
    formData.append("location", shopDetails.location);
    formData.append("category", JSON.stringify(shopDetails.category));
    formData.append("startTime", shopDetails.startTime);
    formData.append("endTime", shopDetails.endTime);

    try {
      const response = await axios.post(
        `http://localhost:3205/api/shop/shops/${ownerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Shop added successfully");
        navigate("/shophome");
      }
    } catch (error) {
      console.error("There was an error adding the shop!", error);
      toast.error("Failed to add shop");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SideNavbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 3, sm: 6 },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 5 },
            maxWidth: 900,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            color="primary"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Add Shop Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  label="Shop Name"
                  name="shopname"
                  value={shopDetails.shopname}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faStore} />
                      </InputAdornment>
                    ),
                    sx: { fontSize: { xs: "1rem", sm: "1.2rem" } },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={shopDetails.phone}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </InputAdornment>
                    ),
                    sx: { fontSize: { xs: "1rem", sm: "1.2rem" } },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={shopDetails.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputAdornment>
                    ),
                    sx: { fontSize: { xs: "1rem", sm: "1.2rem" } },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                    startIcon={<FontAwesomeIcon icon={faUpload} />}
                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  name="location"
                  value={shopDetails.location}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </InputAdornment>
                    ),
                    sx: { fontSize: { xs: "1rem", sm: "1.2rem" } },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Category</Typography>
                <FormGroup row>
                  {categoriesList.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          checked={shopDetails.category.some(
                            (cat) => cat.id === category.id
                          )}
                          onChange={() => toggleCategory(category)}
                          name={category.name}
                        />
                      }
                      label={category.name}
                      sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={shopDetails.startTime}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faClock} />
                      </InputAdornment>
                    ),
                    sx: { fontSize: { xs: "1rem", sm: "1.2rem" } },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={shopDetails.endTime}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faClock} />
                      </InputAdornment>
                    ),
                    sx: { fontSize: { xs: "1rem", sm: "1.2rem" } },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    textTransform: "none",
                  }}
                >
                  Add Shop
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddShop;
