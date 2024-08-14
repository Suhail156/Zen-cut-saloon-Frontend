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
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Navbar from "../Navbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/users/userview/${id}`
        );
        setUser(response.data.data);
        console.log(response.data.data, "res");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    navigate(`/editprofile/${id}`); 
  };

  return (
    <div>
      <Navbar/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(to right, #E0E5EC, #C4C9D4)",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 800,
            borderRadius: 2,
            boxShadow: 3,
            background: "#fff",
            mb:10
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} textAlign="center">
                <Avatar
                  alt="Profile"
                  src={user.profilePicture || "/default-avatar.png"}
                  sx={{ width: 140, height: 140, mb: 2, mx: "auto", border: "3px solid #007BFF" }}
                />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  {user.username}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleEditClick} 
                  sx={{ textTransform: "none" }}
                >
                  Edit Profile
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box textAlign="left">
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Basic Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle1" color="textPrimary">
                    User name:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {user.username || "N/A"}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    Mobile number:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {user.phone || (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ textTransform: "none" }}
                      >
                        + Add
                      </Button>
                    )}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    Email address:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {user.email}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                My social logins
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faFacebook} />}
                    sx={{ textTransform: "none", backgroundColor: "#4267B2" }}
                  >
                    Facebook
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faTwitter} />}
                    sx={{ textTransform: "none", backgroundColor: "#1DA1F2" }}
                  >
                    Twitter
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faInstagram} />}
                    sx={{ textTransform: "none", backgroundColor: "#C13584" }}
                  >
                    Instagram
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default UserProfile;
