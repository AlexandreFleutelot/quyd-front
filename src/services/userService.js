// src/services/userService.js
import { apiRequest, API_ENDPOINTS } from '../config/api';

export const userService = {
  getUsers: async () => {
    return await apiRequest(API_ENDPOINTS.USERS);
  },

  createUser: async (userData) => {
    return await apiRequest(API_ENDPOINTS.USERS, 'POST', userData);
  },

  updateUser: async (userId, userData) => {
    return await apiRequest(`${API_ENDPOINTS.USERS}/${userId}`, 'PUT', userData);
  },

  deleteUser: async (userId) => {
    return await apiRequest(`${API_ENDPOINTS.USERS}/${userId}`, 'DELETE');
  },
};