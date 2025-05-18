import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { usePageTitle } from '../../../context/PageTitleContext';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import './SideNav.css';

const SideNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();
  const { pageTitle } = usePageTitle();

  const menuItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Education", path: "/education", icon: <SchoolIcon /> },
    { name: "Projects", path: "/projects", icon: <CodeIcon /> },
    { name: "Contact", path: "/contact", icon: <ContactMailIcon /> }
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  if (isMobile) return null; // Don't render on mobile

  return (
    <>
      <Drawer
        variant="permanent"
        className={`side-nav ${open ? 'side-nav-open' : 'side-nav-closed'}`}
        classes={{
          paper: open ? 'side-nav-paper-open' : 'side-nav-paper-closed',
        }}
        open={open}
      >
        <Box className="side-nav-header">
          <Box className="side-nav-title">
            {open && <span>Navigation</span>}
            <Tooltip title={open ? "Collapse" : "Expand"}>
              <IconButton 
                onClick={handleDrawerToggle} 
                className="collapse-icon"
                size="medium"
              >
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Divider />
        <List className="side-nav-list">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Tooltip 
                title={!open ? item.name : ""} 
                placement="right"
                disableHoverListener={open}
                key={item.path}
              >
                <ListItem 
                  button 
                  component={Link} 
                  to={item.path}
                  className={`side-nav-item ${isActive ? 'active' : ''}`}
                >
                  <ListItemIcon className="side-nav-icon">
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.name} />}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
        <Box className="side-nav-footer">
          <Tooltip title={open ? "Collapse" : "Expand"}>
            <IconButton
              onClick={handleDrawerToggle}
              className="collapse-icon-footer"
              size="medium"
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <div className={`side-nav-spacer ${open ? 'side-nav-spacer-open' : 'side-nav-spacer-closed'}`} />
    </>
  );
};

export default SideNav; 