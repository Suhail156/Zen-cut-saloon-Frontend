import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Avatar, Divider, Grid, Button } from '@mui/material';

const Shop = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await axios.get(`http://localhost:3205/api/admin/adminviewshop/${id}`);
                setData(response.data.data.shopId[0]);
            } catch (error) {
                console.error('Error fetching shop data:', error);
                setData(null); 
            }
        };
        fetching();
    }, [id]);

    if (data === null) {
        return (
            <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                <Typography variant="h6" color="error">
                    No shop available or data not found.
                </Typography>
            </Box>
        );
    }

    const shop = data || {};

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100vh', 
            background: '#f0f2f5', 
            p: 4, 
            backgroundImage: 'url(/path/to/your/background-image.jpg)',
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
        }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Card elevation={12} sx={{ 
                        borderRadius: 3, 
                        bgcolor: '#ffffff', 
                        boxShadow: 3,
                        background: 'linear-gradient(to bottom right, #ffffff, #e3f2fd)',
                        p: 3 
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                <Avatar
                                    src={shop.image || '/path/to/default-image.jpg'} 
                                    alt={shop.shopname || 'Shop Image'}
                                    sx={{ 
                                        width: 120, 
                                        height: 120, 
                                        mr: 3, 
                                        border: '4px solid #1976d2', 
                                        boxShadow: 4 
                                    }}
                                />
                                <Box>
                                    <Typography variant="h4" component="h1" gutterBottom>
                                        {shop.shopname || 'Shop Name'}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary">
                                        {shop.email || 'No email available'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>Location:</strong> {shop.location || 'No location available'}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>Phone:</strong> {shop.phone || 'No phone number available'}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>Start Time:</strong> {shop.startTime || 'No start time available'}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>End Time:</strong> {shop.endTime || 'No end time available'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/owners')}
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        padding: '10px ',
                        borderRadius: '4px',
                        textTransform: 'none',
                        bgcolor:'green'
                    }}
                >
                    Back to Owners
                </Button>
            </Box>
        </Box>
    );
};

export default Shop;
