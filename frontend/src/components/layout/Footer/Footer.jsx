import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <div className="footer-content">
          <Typography variant="body2" className="footer-copyright">
            © {currentYear} Abdul Moiz. All rights reserved. Designed with ❤️ by {' '}
            <a href="https://github.com/moizmoizdev" target="_blank" rel="noopener noreferrer">
              MoizMoiz
            </a>
          </Typography>
        </div>
      </Container>
    </Box>
  );
};

export default Footer; 