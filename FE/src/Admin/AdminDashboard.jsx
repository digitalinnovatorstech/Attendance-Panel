import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
 import logo from '../assets/logo.png';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeChat from './EmployeeChat';
import AddEmployee from './AddEmployee';
import { DEV_BASE_URL } from '../ApiConfig';
 
const drawerWidth = 200;
 
function AdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 
  const handleMenuItemClick = (view) => {
    setSelectedView(view);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };
 
 const handleLogout = async () => {
      try {
        const token = localStorage.getItem("access_token");
        await fetch(`${DEV_BASE_URL}/api/employees/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        handleClose(); 
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_email');
        navigate('/');
      }
    };
 
  const drawerItems = [
    { text: 'Dashboard', view: 'dashboard', icon: <DashboardIcon /> },
    { text: 'Employee Chat', view: 'chat', icon: <ChatIcon /> },
    { text: 'Add Employee', view: 'addEmployee', icon: <AccountCircleIcon /> },
    
  ];
 
  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ height: 32 }} /> {/* Extra gap above sidebar content */}
      <Toolbar />
      <List>
        {drawerItems.map((item) => (
          <ListItem button key={item.text} onClick={() => handleMenuItemClick(item.view)}>
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)',
          color: '#222',
          boxShadow: '0 2px 8px rgba(60, 72, 88, 0.08)',
          transition: 'background 0.5s',
          animation: 'fadeInDown 0.7s',
          '@keyframes fadeInDown': {
            '0%': { opacity: 0, transform: 'translateY(-30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 40, marginRight: 2, filter: 'drop-shadow(0 2px 8px #6366f1)' }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontWeight: 700,
                color: '#222',
                textShadow: '0 2px 8px #e0e7ef',
                letterSpacing: 2,
                fontSize: '1.7rem',
                animation: 'fadeIn 1.2s',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 1 },
                },
              }}
            >
              Admin Panel
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ background: 'rgba(99, 102, 241, 0.08)', transition: 'background 0.3s', '&:hover': { background: 'rgba(99, 102, 241, 0.18)' } }}
              >
                <AccountCircleIcon sx={{ color: '#6366f1' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)',
                    color: '#222',
                    boxShadow: '0 2px 12px #e0e7ef',
                    animation: 'fadeInMenu 0.5s',
                    '@keyframes fadeInMenu': {
                      '0%': { opacity: 0, transform: 'scale(0.95)' },
                      '100%': { opacity: 1, transform: 'scale(1)' },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleLogout} sx={{ color: '#222', fontWeight: 500, letterSpacing: 1 }}>
                  <LogoutIcon sx={{ mr: 1, color: '#6366f1' }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
 
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ef 100%)',
              color: '#6366f1',
              borderRight: '2px solid #e0e7ef',
              boxShadow: '0 2px 12px #e0e7ef',
              animation: 'fadeInLeft 0.7s',
              '@keyframes fadeInLeft': {
                '0%': { opacity: 0, transform: 'translateX(-30px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' },
              },
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ef 100%)',
          borderRadius: 4,
          boxShadow: '0 2px 16px #e0e7ef33',
          minHeight: '100vh',
          animation: 'fadeInMain 1.2s',
       
          '@keyframes fadeInMain': {
            '0%': { opacity: 0, transform: 'scale(0.98)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        {selectedView === 'dashboard' && <EmployeeDashboard />}
        {selectedView === 'chat' && <EmployeeChat />}
        {selectedView === 'addEmployee' && <AddEmployee />}
      </Box>
    </Box>
  );
}
 
export default AdminDashboard;