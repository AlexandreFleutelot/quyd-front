import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './DocumentModal.css';

const DocumentModal = ({ document, collections, onClose, onAction }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [collectionId, setCollectionId] = useState('');

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setType(document.type);
      setCollectionId(document.collection);
    }
  }, [document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDocument = {
      id: document ? document.id : null,
      title,
      type,
      collection: parseInt(collectionId)
    };
    onAction(updatedDocument, document ? 'update' : 'add');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>{document ? 'Edit Document' : 'Add New Document'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="collection">Collection</label>
            <select
              id="collection"
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              required
            >
              <option value="">Select a collection</option>
              {collections.map(col => (
                <option key={col.id} value={col.id}>{col.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            {document ? 'Update' : 'Add'} Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;