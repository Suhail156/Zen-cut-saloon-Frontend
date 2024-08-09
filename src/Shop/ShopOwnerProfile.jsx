import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, Divider, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideNavbar from './SideNavbar';

const ShopOwnerProfile = () => {
    const [owner, setOwner] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3205/api/shopowner/ownerviewbyid/${id}`
                );
                setOwner(response.data.data);
                console.log(response.data.data, "res");
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
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <SideNavbar />
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Card sx={{ maxWidth: 1200, margin: 'auto', background: 'linear-gradient(to right, #F0F2F5, #BDC6D7)' }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} textAlign="center">
                                <Avatar
                                    alt="Profile"
                                    src={owner.profilePicture}
                                    sx={{ width: 120, height: 120, mb: 2, boxShadow: 2 }}
                                />
                                <Typography variant="h5" component="h2"sx={{marginRight:25}}>
                                    {owner.username}
                                </Typography>
                                <Typography variant="body1" color="textSecondary"sx={{marginRight:24}}>
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
                                        Shop Name:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {owner.shopname || 'N/A'}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        Mobile Number:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {owner.phone || (
                                            <Button variant="outlined" size="small">
                                                + Add
                                            </Button>
                                        )}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        Email Address:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {owner.email}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 3 }} />
                        <Box textAlign="left">
                            <Typography variant="h6" gutterBottom>
                                Shop Address
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body2" color="textSecondary">
                                {owner.address || (
                                    <Button variant="outlined" size="small">
                                        + Add new address
                                    </Button>
                                )}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box textAlign="left">
                            <Typography variant="h6" gutterBottom>
                                Payment Methods
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Button variant="outlined" size="small">
                                + Add payment method
                            </Button>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box textAlign="center">
                            <Typography variant="h6" gutterBottom>
                                Social Logins
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
        </Box>
    );
};

export default ShopOwnerProfile;
