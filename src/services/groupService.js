// src/services/groupService.js
import { apiRequest, API_ENDPOINTS } from '../config/api';

export const groupService = {
  getGroups: async () => {
    return await apiRequest(API_ENDPOINTS.GROUPS);
  },

  createGroup: async (groupData) => {
    return await apiRequest(API_ENDPOINTS.GROUPS, 'POST', groupData);
  },

  updateGroup: async (groupId, groupData) => {
    return await apiRequest(`${API_ENDPOINTS.GROUPS}/${groupId}`, 'PUT', groupData);
  },

  deleteGroup: async (groupId) => {
    return await apiRequest(`${API_ENDPOINTS.GROUPS}/${groupId}`, 'DELETE');
  },
};