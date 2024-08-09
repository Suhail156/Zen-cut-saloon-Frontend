import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Avatar, Divider, Chip, Grid } from '@mui/material';

const Shop = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await axios.get(`http://localhost:3205/api/admin/adminviewshop/${id}`);
                setData(response.data.data.shopId[0]);
                console.log(response.data.data.shopId[0]);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };
        fetching();
    }, [id]);

    if (!data) {
        return <Typography>Loading...</Typography>;
    }

    const shop = data;

    // Determine if category is a string or an array
    const renderCategories = () => {
        if (Array.isArray(shop.category)) {
            return shop.category.map((category, index) => (
                <Chip key={index} label={category} sx={{ m: 0.5 }} />
            ));
        } else if (typeof shop.category === 'string') {
            // Split by comma if it's a string
            const categories = shop.category.split(',').map(cat => cat.trim());
            return categories.map((category, index) => (
                <Chip key={index} label={category} sx={{ m: 0.5 }} />
            ));
        } else {
            return <Typography>No categories available</Typography>;
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            height: '100vh', 
            background: '#f0f2f5', 
            p: 4, 
            backgroundImage: 'url(/path/to/your/background-image.jpg)', // Add your background image path here
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
        }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Card elevation={12} sx={{ borderRadius: 3, bgcolor: '#ffffff', boxShadow: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                <Avatar
                                    src={shop.image}
                                    alt={shop.shopname}
                                    sx={{ width: 120, height: 120, mr: 3, border: '3px solid #1976d2', boxShadow: 3 }}
                                />
                                <Box>
                                    <Typography variant="h4" component="h1" gutterBottom>
                                        {shop.shopname}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary">
                                        {shop.email}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>Location:</strong> {shop.location}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>Phone:</strong> {shop.phone}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>Start Time:</strong> {shop.startTime}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    <strong>End Time:</strong> {shop.endTime}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="h6" component="h3" gutterBottom>
                                Categories
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {renderCategories()}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Shop;
