import React from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import { Typography } from '@mui/material';

const PageTitle = () => {
  const { pageTitle } = usePageTitle();
  
  return (
    <Typography 
      variant="h2" 
      className="section-title" 
      gutterBottom
    >
      {pageTitle}
    </Typography>
  );
};

export default PageTitle; 