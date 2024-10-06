// DeleteConfirmationModal.js
import React from 'react';
import { Trash2, X } from 'lucide-react';
import './Modal.css';

const DeleteConfirmationModal = ({ itemName, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete "{itemName}"?</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            <X size={18} />
            Cancel
          </button>
          <button className="delete-button" onClick={onConfirm}>
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;