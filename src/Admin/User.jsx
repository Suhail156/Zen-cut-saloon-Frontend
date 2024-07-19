import { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from './Sidebar';
import axios from 'axios';

const drawerWidth = 240;

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchedUser = async () => {
      try {
        const response = await axios.get('http://localhost:3205/api/admin/adminuserview');
        setUsers(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchedUser();
  }, []);
  console.log(users);

  const toggleBlockUser = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, blocked: !user.blocked } : user));
  };

  const drawerContent = (handleDrawerToggle, navigate) => (
    <div>
      <Typography variant="h6" sx={{ p: 2, backgroundColor: '#3f51b5', color: '#fff' }}>
        Admin Dashboard
      </Typography>
      <Button
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
            User Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={user.blocked ? 'secondary' : 'primary'}
                        onClick={() => toggleBlockUser(user.id)}
                      >
                        {user.blocked ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default User;
