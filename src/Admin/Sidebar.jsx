import { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ drawerContent }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleDrawerToggle();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#2c3e50",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#34495e",
              color: "#ecf0f1",
              borderRight: "1px solid #2c3e50",
            },
          }}
        >
          {drawerContent(handleDrawerToggle, navigate)}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#34495e",
              color: "#ecf0f1",
              borderRight: "1px solid #2c3e50",
            },
          }}
          open
        >
          <Toolbar />
          <Divider sx={{ borderColor: "#2c3e50" }} />
          <List>
            <ListItem button onClick={() => handleNavigation("/adminhome")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#ecf0f1" }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: "#ecf0f1" }} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/owners")}>
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#e74c3c" }} />
              </ListItemIcon>
              <ListItemText primary="Owners" sx={{ color: "#ecf0f1" }} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/users")}>
              <ListItemIcon>
                <PeopleIcon sx={{ color: "#2ecc71" }} />
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ color: "#ecf0f1" }} />
            </ListItem>
            <Divider sx={{ borderColor: "#2c3e50" }} />
            <ListItem button onClick={() => handleNavigation("/adminlogin")}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#f39c12" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "#ecf0f1" }} />
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
