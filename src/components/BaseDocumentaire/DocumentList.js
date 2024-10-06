import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import './DocumentList.css';

const DocumentList = ({ documents, viewMode, onEdit, onRemove }) => (
  <div className={`document-grid ${viewMode}`}>
    {documents.map(document => (
      <div key={document.id} className="document-card">
        <h3 className="document-title">{document.filename || 'Untitled'}</h3>
        <p className="document-type">{document.type}</p>
        <div className="document-actions">
          {/*TODO: Implement the edit functionnality for metadata edition
          <button onClick={() => onEdit(document)} className="edit-button">
            <Edit2 size={18} />
          </button>*/}
          <button onClick={() => onRemove(document.id)} className="remove-button">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default DocumentList;