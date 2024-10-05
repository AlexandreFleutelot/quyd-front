import React from 'react';
import { FaFolder, FaEllipsisV } from 'react-icons/fa';
import styles from './CollectionList.css';

const CollectionList = ({ collections, onSelectCollection, onDeleteCollection }) => {
  return (
    <div className={styles.collectionList}>
      {collections.map((collection) => (
        <div key={collection.id} className={styles.collectionItem}>
          <button
            className={styles.collectionButton}
            onClick={() => onSelectCollection(collection)}
          >
            <FaFolder className={styles.folderIcon} />
            <span>{collection.name}</span>
          </button>
          {collection.name !== 'All' && (
            <button
              className={styles.menuButton}
              onClick={() => onDeleteCollection(collection.id)}
            >
              <FaEllipsisV />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollectionList;