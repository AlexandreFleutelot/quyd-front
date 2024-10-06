// src/services/accessService.js
import { apiRequest, API_ENDPOINTS } from '../config/api';

export const accessService = {
  getAccesses: async () => {
    return await apiRequest(API_ENDPOINTS.ACCESSES);
  },

  createAccess: async (accessData) => {
    return await apiRequest(API_ENDPOINTS.ACCESSES, 'POST', accessData);
  },

  updateAccess: async (accessId, accessData) => {
    return await apiRequest(`${API_ENDPOINTS.ACCESSES}/${accessId}`, 'PUT', accessData);
  },

  deleteAccess: async (accessId) => {
    return await apiRequest(`${API_ENDPOINTS.ACCESSES}/${accessId}`, 'DELETE');
  },
};