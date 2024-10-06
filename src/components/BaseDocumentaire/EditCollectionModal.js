// EditCollectionModal.js

import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import './Modal.css';

const EditCollectionModal = ({ collection, onClose, onSubmit }) => {
  const [name, setName] = useState(collection.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: collection.id, name });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Collection</h2>
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
              <Save size={18} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCollectionModal;