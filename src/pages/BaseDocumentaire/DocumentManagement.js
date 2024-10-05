import React, { useState } from 'react';
import CollectionsSidebar from '../../components/BaseDocumentaire/CollectionsSidebar';
import DocumentList from '../../components/BaseDocumentaire/DocumentList';
import SearchBar from '../../components/BaseDocumentaire/SearchBar';
import ViewToggle from '../../components/BaseDocumentaire/ViewToggle';
import DocumentModal from '../../components/BaseDocumentaire/DocumentModal';
import { fakeCollections, fakeDocuments } from '../../config/fakeData';
import { PlusIcon } from 'lucide-react';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const [collections, setCollections] = useState(fakeCollections);
  const [documents, setDocuments] = useState(fakeDocuments);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  const filteredDocuments = selectedCollection
    ? documents.filter(doc => doc.collection === selectedCollection.id)
    : documents;

  const searchedDocuments = filteredDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addDocument = (newDocument) => {
    setDocuments([...documents, { ...newDocument, id: Date.now() }]);
    updateCollectionCount(newDocument.collection, 1);
  };

  const removeDocument = (documentId) => {
    const docToRemove = documents.find(doc => doc.id === documentId);
    setDocuments(documents.filter(doc => doc.id !== documentId));
    updateCollectionCount(docToRemove.collection, -1);
  };

  const updateDocument = (updatedDocument) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ));
  };

  const updateCollectionCount = (collectionId, change) => {
    setCollections(collections.map(col => 
      col.id === collectionId ? { ...col, count: col.count + change } : col
    ));
  };

  const openModal = (document = null) => {
    setCurrentDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentDocument(null);
    setIsModalOpen(false);
  };

  const handleDocumentAction = (document, action) => {
    if (action === 'add') addDocument(document);
    if (action === 'update') updateDocument(document);
    if (action === 'remove') removeDocument(document.id);
    closeModal();
  };

  return (
    <div className="document-management">
      <CollectionsSidebar
        collections={collections}
        selectedCollection={selectedCollection}
        onSelectCollection={setSelectedCollection}
      />
      <div className="main-content">
        <div className="content-header">
          <div className="title-section">
            <h1 className="content-title">
              {selectedCollection ? selectedCollection.name : 'All Collections'}
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
          documents={searchedDocuments} 
          viewMode={viewMode} 
          onEdit={openModal}
          onRemove={removeDocument}
        />
      </div>
      {isModalOpen && (
        <DocumentModal
          document={currentDocument}
          collections={collections}
          onClose={closeModal}
          onAction={handleDocumentAction}
        />
      )}
    </div>
  );
};

export default DocumentManagement;