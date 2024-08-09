import SideNavbar from './SideNavbar';
import OwnerNavbar from '../OwnerNavbar';
import { Box, Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { FaDollarSign, FaListAlt, FaCalendarDay } from 'react-icons/fa';


const bookingData = [
  { id: 1, date: '2024-07-19', customer: 'John Doe', service: 'Haircut', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, date: '2024-07-20', customer: 'Jane Smith', service: 'Facial', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, date: '2024-07-21', customer: 'Alice Johnson', service: 'Beard Trim', imageUrl: 'https://via.placeholder.com/150' },

];


const statistics = {
  totalOrders: 123,
  todayOrders: 5,
  monthlyTurnover: 1500.00,
};

const ShopHome = () => {
  return (
    <>
        <OwnerNavbar />
    <div className="flex h-screen">
      <SideNavbar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, p: 4, bgcolor: '#f5f5f5' }}>
          <Container>
            <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center', mb: 4 }}>
              Welcome to ShopHome
            </Typography>
            
            <Grid container spacing={4} mb={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 3 }}>
                  <FaListAlt size={40} color="#3f51b5" />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Total Orders
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                      {statistics.totalOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 3 }}>
                  <FaCalendarDay size={40} color="#3f51b5" />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Todays Orders
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                      {statistics.todayOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 3 }}>
                  <FaDollarSign size={40} color="#3f51b5" />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Monthly Turnover
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                      ${statistics.monthlyTurnover.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

           
            <Typography variant="h5" gutterBottom color="primary">
              Recent Bookings
            </Typography>
            <Grid container spacing={4}>
              {bookingData.map((booking) => (
                <Grid item xs={12} sm={6} md={4} key={booking.id}>
                  <Card variant="outlined" sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={booking.imageUrl}
                      alt="Booking Image"
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" color="secondary">
                        Booking Date: {booking.date}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        Customer: {booking.customer}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Service: {booking.service}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
    </>
  );
};

export default ShopHome;
