import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu, Info, Edit, Event } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Owner = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3205/api/admin/adminownerview"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handlePopoverOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const open = Boolean(anchorEl);

  const handleDetails = (userId) => {
    navigate(`/shopdetails/${userId}`);
    handlePopoverClose();
  };

  const handleEdit = (userId) => {
    navigate(`/admineditowners/${userId}`);
    handlePopoverClose();
  };

  const handleBookingDetails = (userId) => {
    navigate(`/bookingdetails/${userId}`);
    handlePopoverClose();
  };

  const drawerContent = (handleDrawerToggle, navigate) => (
    <div>
      <Typography
        variant="h6"
        sx={{ p: 2, backgroundColor: "#3f51b5", color: "#fff" }}
      >
        Admin Dashboard
      </Typography>
      <Button
        onClick={() => {
          navigate("/adminhome");
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        Home
      </Button>
      <Button
        onClick={() => {
          navigate("/users");
          handleDrawerToggle();
        }}
        fullWidth
        sx={{
          justifyContent: "flex-start",
          padding: "10px 20px",
          color: "#3f51b5",
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        Users
      </Button>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar drawerContent={drawerContent} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Owner Management
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              maxWidth: "100%",
              mt: 2,
              borderRadius: 2,
              boxShadow: 3,
              [theme.breakpoints.down("sm")]: {
                maxWidth: "100vw",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Serial Number</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Username</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Shop Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Phone Number</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user._id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        bgcolor: theme.palette.action.hover,
                      },
                      "&:hover": {
                        bgcolor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.shopname}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>
                      <Tooltip title="Actions">
                        <IconButton
                          color="primary"
                          onClick={(event) => handlePopoverOpen(event, user)}
                          sx={{
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.2)",
                              bgcolor: theme.palette.action.hover,
                            },
                          }}
                        >
                          <Menu />
                        </IconButton>
                      </Tooltip>
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            width: { xs: 200, sm: 250 },
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 3,
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            Actions
                          </Typography>
                          <Divider />
                          <List>
                            <ListItem button onClick={() => handleDetails(selectedUser._id)}>
                              <ListItemIcon>
                                <Info color="primary" />
                              </ListItemIcon>
                              <ListItemText primary="Shop" />
                            </ListItem>
                            <ListItem button onClick={() => handleEdit(selectedUser._id)}>
                              <ListItemIcon>
                                <Edit color="primary" />
                              </ListItemIcon>
                              <ListItemText primary="Edit" />
                            </ListItem>
                            <ListItem button onClick={() => handleBookingDetails(selectedUser._id)}>
                              <ListItemIcon>
                                <Event color="primary" />
                              </ListItemIcon>
                              <ListItemText primary="Booking Details" />
                            </ListItem>
                          </List>
                        </Box>
                      </Popover>
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

export default Owner;
