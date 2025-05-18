import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitleContext = createContext();
export const usePageTitle = () => useContext(PageTitleContext);

export const PageTitleProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Home');
  const location = useLocation();

  const routeTitles = {
    '/': 'Home',
    '/education': 'Education',
    '/projects': 'Projects',
    '/contact': 'Contact'
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const newTitle = routeTitles[currentPath] || 'Portfolio';
    setPageTitle(newTitle);
    
    document.title = `${newTitle} | My Portfolio`;
  }, [location.pathname]);

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export default PageTitleContext; 