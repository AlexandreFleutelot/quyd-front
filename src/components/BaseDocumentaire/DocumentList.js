import React, { useState } from 'react';
import { FaFile, FaDownload, FaEllipsisV } from 'react-icons/fa';
import styles from './DocumentList.css';

const DocumentList = ({ collectionName }) => {
  // Fake data for documents
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Léon Marchand — Wikipédia', date: '12/09/2024' },
    { id: 2, name: 'Tarte au citron — Wikipédia', date: '12/09/2024' },
    { id: 3, name: 'La France — Wikipédia', date: '12/09/2024' },
    { id: 4, name: 'Esport — Wikipédia', date: '12/09/2024' },
    { id: 5, name: 'Fortnite — Wikipédia', date: '12/09/2024' },
  ]);

  const handleDeleteDocument = (documentId) => {
    setDocuments(documents.filter(d => d.id !== documentId));
  };

  return (
    <div className={styles.documentList}>
      <h2>{collectionName}</h2>
      <table className={styles.documentTable}>
        <thead>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Date</th>
            <th>Collections</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td><input type="checkbox" /></td>
              <td>
                <FaFile className={styles.fileIcon} />
                {doc.name}
              </td>
              <td>{doc.date}</td>
              <td>{collectionName}</td>
              <td>
                <button className={styles.actionButton}>
                  <FaDownload />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;