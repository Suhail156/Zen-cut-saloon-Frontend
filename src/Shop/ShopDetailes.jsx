import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import SideNavbar from "./SideNavbar";

const ShopDetails = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
  const [shops, setShops] = useState([]);
  const id = localStorage.getItem("ownerId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/shopowner/ownerviewshop/${id}`
        );
        const shopData = response.data.data.shopId.map((shop) => {
          let categories = [];
          try {
            categories = shop.category ? JSON.parse(shop.category) : [];
          } catch (error) {
            console.error("Error parsing categories:", error);
          }
          return {
            ...shop,
            category: categories,
          };
        });
        setShops(shopData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShops();
  }, [id]);

  const handleEdit = () => {
    navigate(`/editshop/${id}`);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#f0f2f5" }}>
      <SideNavbar />
      <Box sx={{ flexGrow: 1, p: 4 ,backgroundColor: "#e0e0e0" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shop Profile
        </Typography>
        {shops.map((shop) => (
          <Paper
            key={shop._id}
            elevation={3}
            sx={{ p: 4, borderRadius: 2, mb: 4, minHeight: 300 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={shop.image}
                alt={shop.shopname}
                sx={{ width: 120, height: 120, mr: 3 }}
              />
              <Box>
                <Typography variant="h5" component="h2">
                  {shop.shopname}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {shop.email}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" color="textSecondary">
                <strong>Location:</strong> {shop.location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Phone:</strong> {shop.phone}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Start Time:</strong> {shop.startTime}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>End Time:</strong> {shop.endTime}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                <strong>Category:</strong>
                {Array.isArray(shop.category) && shop.category.length > 0 ? (
                  shop.category.map((category, index) => (
                    <Chip
                      key={index}
                      label={category.name || "Unknown"}
                      sx={{ ml: 1 }}
                    />
                  ))
                ) : (
                  <span>No categories available</span>
                )}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ShopDetails;
