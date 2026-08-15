import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      try {
        const projRes = await api.get('/projects');
        setProjects(projRes.data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      }

      // Fetch profile
      try {
        const profRes = await api.get('/profile');
        if (profRes.data) setProfile(profRes.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    } catch (error) {
      console.error("Failed to load portfolio data", error);
    } finally {
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
