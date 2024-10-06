// src/components/BaseDocumentaire/CollectionsSidebar.js
import React, { useState } from 'react';
import { FolderIcon, PlusIcon, LayersIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import './CollectionsSidebar.css';
import EditCollectionModal from './EditCollectionModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import NewCollectionModal from './NewCollectionModal';

const CollectionsSidebar = ({ 
  collections, 
  selectedCollection, 
  onSelectCollection, 
  onAddCollection, 
  onUpdateCollection, 
  onDeleteCollection 
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);

  const handleEditClick = (collection, e) => {
    e.stopPropagation();
    setCurrentCollection(collection);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (collection, e) => {
    e.stopPropagation();
    setCurrentCollection(collection);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = (updatedCollection) => {
    onUpdateCollection(updatedCollection.id, updatedCollection.name);
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDeleteCollection(currentCollection.id);
    setDeleteModalOpen(false);
  };

  const handleNewCollectionClick = () => {
    setNewModalOpen(true);
  };

  const handleNewCollectionSubmit = (name) => {
    onAddCollection(name);
    setNewModalOpen(false);
  };

  const handleUpdateCollection = (collection, newName) => {
    console.log('Updating collection:', collection.id, newName); // Add this log
    onUpdateCollection(collection.id, newName);
  };

  return (
    <div className="collections-sidebar">
      <h2 className="sidebar-title">Collections</h2>
      <div className="collections-list">
        <button
          onClick={() => onSelectCollection(null)}
          className={`collection-item all-collections ${!selectedCollection ? 'active' : ''}`}
        >
          <LayersIcon size={24} />
          <span className="collection-name">All Collections</span>
        </button>
        {collections.map(collection => (
          <button
            key={collection.id}
            onClick={() => onSelectCollection(collection)}
            className={`collection-item ${selectedCollection?.id === collection.id ? 'active' : ''}`}
          >
            <FolderIcon size={24} />
            <span className="collection-name">{collection.name}</span>
            <div className="collection-actions">
              <Edit2Icon size={20} className="edit-icon" onClick={(e) => handleEditClick(collection, e)} />
              <Trash2Icon size={20} className="delete-icon" onClick={(e) => handleDeleteClick(collection, e)} />
            </div>
          </button>
        ))}
      </div>
      <button className="new-collection-button" onClick={handleNewCollectionClick}>
        <PlusIcon size={24} />
        <span>New Collection</span>
      </button>
      {editModalOpen && (
        <EditCollectionModal
          collection={currentCollection}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
      {deleteModalOpen && (
        <DeleteConfirmationModal
          itemName={currentCollection.name}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {newModalOpen && (
        <NewCollectionModal
          onClose={() => setNewModalOpen(false)}
          onSubmit={handleNewCollectionSubmit}
        />
      )}
    </div>
  );
};

export default CollectionsSidebar;