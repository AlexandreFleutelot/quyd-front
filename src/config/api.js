// src/config/api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/token`,
  USERS: `${API_BASE_URL}/users`,
  // Add other endpoints as needed
};

export const getAuthToken = () => localStorage.getItem('authToken');

export const setAuthToken = (token) => localStorage.setItem('authToken', token);

export const removeAuthToken = () => localStorage.removeItem('authToken');

export const isAuthenticated = () => !!getAuthToken();

export async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}