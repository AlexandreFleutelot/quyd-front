// src/services/documentService.js

import { API_ENDPOINTS, apiRequest } from '../config/api';

export { API_ENDPOINTS };

export const getFolders = async () => {
  return await apiRequest(API_ENDPOINTS.FOLDERS);
};

export const createFolder = async (folderName) => {
  return await apiRequest(API_ENDPOINTS.FOLDERS, 'POST', { name: folderName });
};

export const updateFolder = async (folderId, folderName) => {
  return await apiRequest(`${API_ENDPOINTS.FOLDERS}/${folderId}`, 'PUT', { name: folderName });
};

export const deleteFolder = async (folderId) => {
  return await apiRequest(`${API_ENDPOINTS.FOLDERS}/${folderId}`, 'DELETE');
};

export const getDocuments = async (folderId = null) => {
  const url = folderId 
    ? `${API_ENDPOINTS.DOCUMENTS}?folder_id=${folderId}`
    : API_ENDPOINTS.DOCUMENTS;
  return await apiRequest(url);
};

export const uploadDocument = async (formData, url) => {
  return await apiRequest(url, 'POST', formData, true);
};

export const deleteDocument = async (documentId) => {
  return await apiRequest(`${API_ENDPOINTS.DOCUMENTS}/${documentId}`, 'DELETE');
};