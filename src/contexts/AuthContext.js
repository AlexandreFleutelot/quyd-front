// src/contexts/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthToken, removeAuthToken, apiRequest, API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userData = await apiRequest(API_ENDPOINTS.USERS + '/me');
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user:', error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);