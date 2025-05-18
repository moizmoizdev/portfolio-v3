import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import Header from './components/layout/Header';
import SideNav from './components/layout/SideNav';
import Footer from './components/layout/Footer';
import { PageTitleProvider } from './context/PageTitleContext';

const HeroSection = lazy(() => import('./components/sections/Hero'));
const Education = lazy(() => import('./components/sections/Education'));
const Projects = lazy(() => import('./components/sections/Projects/Projects'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));

function App() {
  return (
    <Router>
      <PageTitleProvider>
        <div className="App">
          <Header />
          <div className="app-container">
            <SideNav />
            <div className="content-container">
              <main className="main-content">
                <Suspense fallback={<div className="loading">Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </PageTitleProvider>
    </Router>
  );
}

// Home page component that includes the hero section
const Home = () => {
  return (
    <div className="page-transition">
      <HeroSection />
    </div>
  );
};

export default App;
