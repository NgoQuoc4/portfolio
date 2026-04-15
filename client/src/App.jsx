import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

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

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      const timer = setTimeout(() => setShowPreloader(false), 2000);
      return () => clearTimeout(timer);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {showPreloader && <Preloader key="preloader" />}
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
      </AuthProvider>
    </LanguageProvider>
  );
}



export default App;

