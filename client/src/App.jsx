import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { PortfolioProvider, PortfolioContext } from './context/PortfolioContext';

import Home from './pages/Home';
import Login from './pages/Admin/Login';
import Register from './pages/Admin/Register';
import Dashboard from './pages/Admin/Dashboard';
import Preloader from './components/Preloader';

// Component bảo vệ Route
const PrivateRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return null; // Wait for Auth check
  return user ? children : <Navigate to="/admin/login" />;
};

const AppContent = () => {
  const { loading: authLoading } = React.useContext(AuthContext);
  const { loading: portfolioLoading } = React.useContext(PortfolioContext);
  const [showPreloader, setShowPreloader] = useState(true);
  const [minTimeExpired, setMinTimeExpired] = useState(false);

  useEffect(() => {
    // Minimum 2 second loader for branding/aesthetic
    const timer = setTimeout(() => setMinTimeExpired(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show preloader until EVERYTHING is ready
  const isEverythingReady = !authLoading && !portfolioLoading && minTimeExpired;

  const handlePreloaderFinish = () => {
    setShowPreloader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader 
            key="preloader" 
            isReady={isEverythingReady} 
            onFinish={handlePreloaderFinish} 
          />
        )}
      </AnimatePresence>


      
      {!showPreloader && (
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<Register />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;


