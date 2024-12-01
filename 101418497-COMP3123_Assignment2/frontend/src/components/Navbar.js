import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/employees" startIcon={<GroupIcon />}>
                Employees
              </Button>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                {username}
              </Typography>
              <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

