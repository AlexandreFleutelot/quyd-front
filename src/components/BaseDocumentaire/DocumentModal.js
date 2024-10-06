import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './DocumentModal.css';

const DocumentModal = ({ document, collections, onClose, onAction }) => {
  const [file, setFile] = useState(null);
  const [collectionId, setCollectionId] = useState('');

  useEffect(() => {
    if (document) {
      setCollectionId(document.collection || '');
    }
  }, [document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Only pass the collectionId if it's not an empty string
      onAction(file, 'add', collectionId || undefined);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Upload New Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="collection">Collection (Optional)</label>
            <select
              id="collection"
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            >
              <option value="">Select a collection</option>
              {collections.map(col => (
                <option key={col.id} value={col.id}>{col.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Upload Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;