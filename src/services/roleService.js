// src/services/roleService.js
import { apiRequest, API_ENDPOINTS } from '../config/api';

export const roleService = {
  getRoles: async () => {
    return await apiRequest(API_ENDPOINTS.ROLES);
  },

  createRole: async (roleData) => {
    return await apiRequest(API_ENDPOINTS.ROLES, 'POST', roleData);
  },

  updateRole: async (roleId, roleData) => {
    return await apiRequest(`${API_ENDPOINTS.ROLES}/${roleId}`, 'PUT', roleData);
  },

  deleteRole: async (roleId) => {
    return await apiRequest(`${API_ENDPOINTS.ROLES}/${roleId}`, 'DELETE');
  },
};