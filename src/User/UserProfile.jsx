import { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography, Divider, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();

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

    return (
        <div>
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
                <Card sx={{  width: '100%', background: 'linear-gradient(to right, #F0F2F5, #BDC6D7)' }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} textAlign="center">
                                <Avatar
                                    // src={user.profilePicture}
                                    alt="Profile"
                                    sx={{ width: 120, height: 120, mb: 2, boxShadow: 2 }}
                                />
                                <Typography variant="h5" component="h2" style={{marginRight:'85px'}} >
                                    {user.username}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" style={{marginRight:'85px'}}>
                                    Edit basic info
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Box textAlign="left">
                                    <Typography variant="h6" gutterBottom>
                                        Basic Information
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant="subtitle1" color="textPrimary">
                                        User name:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {user.username || 'N/A'}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        Mobile number:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {user.phone || (
                                            <Button variant="outlined" size="small">
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
                        <Box textAlign="left">
                            <Typography variant="h6" gutterBottom>
                                My addresses
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Button variant="outlined" size="small">
                                + Add new address
                            </Button>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box textAlign="left">
                            <Typography variant="h6" gutterBottom>
                                My payment methods
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Button variant="outlined" size="small">
                                + Add payment method
                            </Button>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box textAlign="center">
                            <Typography variant="h6" gutterBottom>
                                My social logins
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faFacebook} />}>
                                        Facebook
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faTwitter} />}>
                                        Twitter
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faInstagram} />}>
                                        Instagram
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <div style={{marginTop:'50px'}} >
            <Footer />
            </div>
           
        </div>
    );
};

export default UserProfile;
