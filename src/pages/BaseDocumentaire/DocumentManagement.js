import React, { useState, useEffect } from 'react';
import CollectionsSidebar from '../../components/BaseDocumentaire/CollectionsSidebar';
import DocumentList from '../../components/BaseDocumentaire/DocumentList';
import SearchBar from '../../components/BaseDocumentaire/SearchBar';
import ViewToggle from '../../components/BaseDocumentaire/ViewToggle';
import DocumentModal from '../../components/BaseDocumentaire/DocumentModal';
import { PlusIcon } from 'lucide-react';
import './DocumentManagement.css';
import * as documentService from '../../services/documentService';
import { API_ENDPOINTS } from '../../config/api';


const DocumentManagement = () => {
  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    fetchFolders();
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchDocuments(selectedFolder.id);
    } else {
      fetchDocuments();
    }
  }, [selectedFolder]);

  const fetchFolders = async () => {
    try {
      console.log('Fetching folders');
      const fetchedFolders = await documentService.getFolders();
      console.log('Fetched folders:', fetchedFolders);
      setFolders(fetchedFolders);
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    }
  };

  const fetchDocuments = async (folderId = null) => {
    try {
      const fetchedDocuments = await documentService.getDocuments(folderId);
      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  };

  const addFolder = async (folderName) => {
    try {
      console.log('Adding new folder:', folderName);
      const newFolder = await documentService.createFolder(folderName);
      console.log('New folder created:', newFolder);
      setFolders([...folders, newFolder]);
      console.log('Updated folders state:', folders);
    } catch (error) {
      console.error('Failed to add folder:', error);
    }
  };

  const updateFolder = async (folderId, folderName) => {
    try {
      const updatedFolder = await documentService.updateFolder(folderId, folderName);
      setFolders(folders.map(folder => folder.id === folderId ? updatedFolder : folder));
    } catch (error) {
      console.error('Failed to update folder:', error);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await documentService.deleteFolder(folderId);
      setFolders(folders.filter(folder => folder.id !== folderId));
      if (selectedFolder && selectedFolder.id === folderId) {
        setSelectedFolder(null);
      }
    } catch (error) {
      console.error('Failed to delete folder:', error);
    }
  };

  const uploadDocument = async (file, folderId) => {
    const formData = new FormData();
    formData.append('file', file);
    
    let url = API_ENDPOINTS.DOCUMENTS;
    if (folderId && folderId !== 'undefined') {
      url += `?folder_id=${folderId}`;
    }

    await documentService.uploadDocument(formData, url);
  };

  const deleteDocument = async (documentId) => {
    try {
      await documentService.deleteDocument(documentId);
      setDocuments(documents.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (document = null) => {
    setCurrentDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentDocument(null);
    setIsModalOpen(false);
  };

  const handleDocumentAction = async (file, action, folderId) => {
    if (action === 'add') {
      try {
        await uploadDocument(file, folderId);
        closeModal();
        fetchDocuments(selectedFolder ? selectedFolder.id : null);
      } catch (error) {
        console.error('Failed to upload document:', error);
        // Handle error (e.g., show an error message to the user)
      }
    } else if (action === 'edit') {
      // Implement edit functionality here
      console.log('Editing document:', currentDocument);
      closeModal();
    }
  };

  return (
    <div className="document-management">
      <CollectionsSidebar
        collections={folders}
        selectedCollection={selectedFolder}
        onSelectCollection={setSelectedFolder}
        onAddCollection={addFolder}
        onUpdateCollection={updateFolder}
        onDeleteCollection={deleteFolder}
      />
      <div className="main-content">
        <div className="content-header">
          <div className="title-section">
            <h1 className="content-title">
              {selectedFolder ? selectedFolder.name : 'All Collections'}
            </h1>
            <button className="add-document-button" onClick={() => openModal()}>
              <PlusIcon size={18} />
              Add Document
            </button>
          </div>
          <div className="content-actions">
            <SearchBar onSearch={setSearchQuery} />
            <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
          </div>
        </div>
        <DocumentList 
          documents={filteredDocuments} 
          viewMode={viewMode} 
          onRemove={deleteDocument}
        />
      </div>
      {isModalOpen && (
        <DocumentModal
          document={currentDocument}
          collections={folders}
          onClose={closeModal}
          onAction={handleDocumentAction}
        />
      )}
    </div>
  );
};

export default DocumentManagement;