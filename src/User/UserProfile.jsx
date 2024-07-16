import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const {id}=useParams()
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            ` http://localhost:3205/api/users/userview/${id}`
          );
          setUser(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, [id]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #F0F2F5, #BDC6D7)',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%', p: 4, boxShadow: 5, borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            // src={user.profilePicture}
            alt="Profile"
            sx={{ width: 120, height: 120, mb: 2, boxShadow: 2 }}
          />
          <Typography variant="h4" component="h2" gutterBottom>
            {user.username}
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            {user.bio}
          </Typography>
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="subtitle1" color="textPrimary">
              Email:
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {user.email}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              Phone:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.phone}
            </Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <IconButton href={user.socialLinks.facebook} color="primary" sx={{ '&:hover': { color: '#3b5998' } }}>
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton href={user.socialLinks.twitter} sx={{ color: '#1DA1F2', '&:hover': { color: '#0d8ddb' } }}>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton href={user.socialLinks.instagram} sx={{ color: '#C13584', '&:hover': { color: '#833ab4' } }}>
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
