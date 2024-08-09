import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faPhoneAlt, faEnvelope, faUpload, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import SideNavbar from './SideNavbar';
import { Box,Button,Drawer,Grid,IconButton,InputAdornment,Paper,TextField,Typography,Checkbox,FormControlLabel,FormGroup} from '@mui/material';

const AddShop = () => {
  const navigate = useNavigate();
  const [shopDetails, setShopDetails] = useState({
    shopname: '',
    phone: '',
    email: '',
    image: null,
    category: [],
    location: '',
    startTime: '',
    endTime: '',
  });

  const categoriesList = [
    { id: 'haircut', name: 'Haircut' },
    { id: 'facial', name: 'Facial' },
    { id: 'beard', name: 'Beard' },
  ];

  const ownerId = localStorage.getItem('ownerId')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({
      ...shopDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setShopDetails({
      ...shopDetails,
      image: e.target.files[0],
    });
  };

  const toggleCategory = (category) => {
    setShopDetails((prevDetails) => {
      const isSelected = prevDetails.category.find((cat) => cat.id === category.id);
      if (isSelected) {
        return {
          ...prevDetails,
          category: prevDetails.category.filter((cat) => cat.id !== category.id),
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
    const formData = new FormData();
    formData.append('shopname', shopDetails.shopname);
    formData.append('phone', shopDetails.phone);
    formData.append('email', shopDetails.email);
    formData.append('image', shopDetails.image);
    formData.append('location', shopDetails.location);
    formData.append('category', JSON.stringify(shopDetails.category));
    formData.append('startTime', shopDetails.startTime);
    formData.append('endTime', shopDetails.endTime);

    try {
      const response = await axios.post(`http://localhost:3205/api/shop/shops/${ownerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        toast.success('Shop added successfully');
        navigate('/shophome');
      }
    } catch (error) {
      console.error('There was an error adding the shop!', error);
      toast.error('Failed to add shop');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',  
    }}>
      <SideNavbar />
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
            Add Shop Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
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
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Category</Typography>
                <FormGroup row>
                  {categoriesList.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      control={
                        <Checkbox
                          checked={shopDetails.category.some((cat) => cat.id === category.id)}
                          onChange={() => toggleCategory(category)}
                          name={category.name}
                        />
                      }
                      label={category.name}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
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
