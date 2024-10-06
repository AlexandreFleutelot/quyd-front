// src/components/BaseDocumentaire/NewCollectionModal.js
import React, { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';
import './Modal.css';

const NewCollectionModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Collection</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Collection name"
            required
          />
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              <X size={18} />
              Cancel
            </button>
            <button type="submit" className="save-button">
              <FolderPlus size={18} />
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCollectionModal;