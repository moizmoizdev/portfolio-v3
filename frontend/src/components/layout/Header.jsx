import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Container,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" }
  ];

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  
  return (
    <AppBar position="fixed" elevation={0} className="header">
      <Container maxWidth="lg" disableGutters={isMobile}>
        <Toolbar disableGutters className="toolbar">
          <Typography component="h1" variant="h6" className="logo">
            <Link to="/">Portfolio</Link>
          </Typography>
          
          {isMobile ? (
            <>
              <IconButton
                onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
                className="menu-button"
                size="medium"
                edge="start"
                aria-label="menu"
              >
                <MenuIcon 
                  sx={{
                    display: 'block',
                    '& path': {
                      strokeWidth: 0.8,  // Makes lines more defined
                      stroke: '#e2e8f0'  // Ensures lines have good contrast
                    }
                  }}
                />
              </IconButton>
              
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={() => setMobileMenuAnchor(null)}
                className="mobile-menu"
              >
                {menuItems.map(item => (
                  <MenuItem 
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={() => setMobileMenuAnchor(null)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box className="nav-container">
              {menuItems.map(item => (
                <Link key={item.path} to={item.path} className="nav-link">
                  {item.name}
                </Link>
              ))}
            </Box>
          )}

          <Box className="profile-container">
            <IconButton onClick={handleProfileMenuOpen} className="profile-button">
              <Avatar 
                src="/assets/avatar.png" 
                alt="Profile" 
                className="profile-avatar"
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              className="profile-menu"
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 