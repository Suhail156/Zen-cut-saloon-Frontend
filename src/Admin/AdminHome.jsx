import { Box, Container, Grid, Paper, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { AttachMoney as AttachMoneyIcon, ShoppingCart as ShoppingCartIcon, People as PeopleIcon, Home as HomeIcon, Logout as LogoutIcon, Event as EventIcon, Store as StoreIcon, Person as PersonIcon } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const AdminHome = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const drawerContent = (handleDrawerToggle, navigate) => (
    <div>
      <Typography variant="h6" sx={{ p: 2, backgroundColor: '#3f51b5', color: '#fff' }}>
        Admin Dashboard
      </Typography>
      <Button
        startIcon={<HomeIcon />}
        onClick={() => {
          navigate('/adminhome');
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          padding: '10px 20px',
          color: '#3f51b5',
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        Home
      </Button>
      <Button
        startIcon={<ShoppingCartIcon />}
        onClick={() => {
          navigate('/owners');
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          padding: '10px 20px',
          color: '#3f51b5',
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        Owners
      </Button>
      <Button
        startIcon={<PeopleIcon />}
        onClick={() => {
          navigate('/users');
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          padding: '10px 20px',
          color: '#3f51b5',
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        Users
      </Button>
      <Button
        startIcon={<LogoutIcon />}
        onClick={() => {
          navigate('/adminlogin');
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          padding: '10px 20px',
          color: '#3f51b5',
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar drawerContent={drawerContent} />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h5" component="div">
                    3,567
                  </Typography>
                </CardContent>
                <CardMedia>
                  <PersonIcon style={{ fontSize: 40, color: '#3f51b5' }} />
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Shop Owners
                  </Typography>
                  <Typography variant="h5" component="div">
                    123
                  </Typography>
                </CardContent>
                <CardMedia>
                  <StoreIcon style={{ fontSize: 40, color: '#f50057' }} />
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Bookings
                  </Typography>
                  <Typography variant="h5" component="div">
                    789
                  </Typography>
                </CardContent>
                <CardMedia>
                  <EventIcon style={{ fontSize: 40, color: '#4caf50' }} />
                </CardMedia>
              </Card>
            </Grid>
            {/* Sales Chart */}
            <Grid item xs={12} lg={9}>
              <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                <Typography variant="h6">Sales Over Time</Typography>
                <Line data={chartData} />
              </Paper>
            </Grid>
            {/* Welcome Message */}
            {/* <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6">Welcome to Admin Dashboard</Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                  ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                  mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                </Typography>
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminHome;
