import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SideNavbar from "./SideNavbar";

const ShopOwnerProfile = () => {
  const [owner, setOwner] = useState(null);
  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/shopowner/ownerviewbyid/${id}`
        );
        setOwner(response.data.data);
      } catch (error) {
        console.error("Error fetching shop owner data:", error);
      }
    };
    fetchOwner();
  }, [id]);

  if (!owner) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#F5F5F5" }}>
      <SideNavbar />
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "80%",
            maxWidth: 1400,
            borderRadius: 8,
            boxShadow: 12,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={4} textAlign="center">
                <Avatar
                  alt="Profile"
                  src={owner.profilePicture}
                  sx={{
                    width: 180,
                    height: 180,
                    mb: 2,
                    ml: 3,
                    border: "4px solid #BDC6D7",
                    boxShadow: 6,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <Typography variant="h4" component="h2" gutterBottom>
                  {owner.username}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box textAlign="left">
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Basic Information
                  </Typography>
                  <Divider sx={{ mb: 2, borderColor: "#BDC6D7" }} />
                  <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Shop Name:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {owner.shopname || "N/A"}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Mobile Number:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {owner.phone || "N/A"}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Email Address:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {owner.email}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3, borderColor: "#BDC6D7" }} />
            <Box textAlign="center">
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Social Logins
              </Typography>
              <Divider sx={{ mb: 2, borderColor: "#BDC6D7" }} />
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faFacebook} />}
                    sx={{
                      borderColor: "#3b5998",
                      color: "#3b5998",
                      "&:hover": {
                        borderColor: "#2d4373",
                        backgroundColor: "#e9eff1",
                      },
                    }}
                  >
                    Facebook
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faTwitter} />}
                    sx={{
                      borderColor: "#1da1f2",
                      color: "#1da1f2",
                      "&:hover": {
                        borderColor: "#1a91da",
                        backgroundColor: "#e6f4f6",
                      },
                    }}
                  >
                    Twitter
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faInstagram} />}
                    sx={{
                      borderColor: "#e4405f",
                      color: "#e4405f",
                      "&:hover": {
                        borderColor: "#d93e5b",
                        backgroundColor: "#fbeef0",
                      },
                    }}
                  >
                    Instagram
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 3, borderColor: "#BDC6D7" }} />
            <Box textAlign="center">
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 8, mt: 2 }}
                onClick={() => nav(`/editowner/${id}`)}
              >
                Edit Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ShopOwnerProfile;
