import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = async () => {
    try {
      const [projRes, profRes] = await Promise.all([
        api.get('/projects'),
        api.get('/profile')
      ]);
      setProjects(projRes.data);
      if (profRes.data) setProfile(profRes.data);
    } catch (error) {
      console.error("Failed to load portfolio data", error);
    } finally {
      // Add a artificial minimum loading time for preloader aesthetics if needed
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ projects, profile, loading, refreshData: fetchPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};
