import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CollectionList from '../../components/BaseDocumentaire/CollectionList';
import DocumentList from '../../components/BaseDocumentaire/DocumentList';
import AddCollectionButton from '../../components/BaseDocumentaire/AddCollectionButton';
import styles from './BaseDocumentaire.css';

const BaseDocumentaire = () => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Fake data for collections
  const [collections, setCollections] = useState([
    { id: 1, name: 'All' },
    { id: 2, name: 'Wikipedia' },
    { id: 3, name: 'Videlio2' },
  ]);

  const handleAddCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections(collections.filter(c => c.id !== collectionId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestion des Collections et des Documents</h1>
      <Link to="/admin-dashboard" className={styles.backLink}>
        ← Retour dashboard admin
      </Link>
      <div className={styles.actionButtons}>
        <AddCollectionButton onAdd={handleAddCollection} />
        <button className={styles.downloadButton}>Télécharger</button>
      </div>
      <div className={styles.content}>
        <CollectionList
          collections={collections}
          onSelectCollection={setSelectedCollection}
          onDeleteCollection={handleDeleteCollection}
        />
        {selectedCollection && (
          <DocumentList collectionName={selectedCollection.name} />
        )}
      </div>
    </div>
  );
};

export default BaseDocumentaire;