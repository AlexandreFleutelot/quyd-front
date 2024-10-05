import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from './AddCollectionButton.css';

const AddCollectionButton = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      onAdd({ id: Date.now(), name: newCollectionName.trim() });
      setNewCollectionName('');
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.addCollection}>
      {isAdding ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Nom de la collection"
            autoFocus
          />
          <button type="submit">Ajouter</button>
          <button type="button" onClick={() => setIsAdding(false)}>Annuler</button>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)}>
          <FaPlus /> Ajouter Collection
        </button>
      )}
    </div>
  );
};

export default AddCollectionButton;