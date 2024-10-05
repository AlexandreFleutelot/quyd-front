import React from 'react';
import { FolderIcon, PlusIcon, LayersIcon } from 'lucide-react';
import './CollectionsSidebar.css';

const CollectionsSidebar = ({ collections, selectedCollection, onSelectCollection }) => (
  <div className="collections-sidebar">
    <h2 className="sidebar-title">Collections</h2>
    <div className="collections-list">
      <button
        onClick={() => onSelectCollection(null)}
        className={`collection-item all-collections ${!selectedCollection ? 'active' : ''}`}
      >
        <LayersIcon size={18} />
        <span className="collection-name">All Collections</span>
      </button>
      {collections.map(collection => (
        <button
          key={collection.id}
          onClick={() => onSelectCollection(collection)}
          className={`collection-item ${selectedCollection?.id === collection.id ? 'active' : ''}`}
        >
          <FolderIcon size={18} />
          <span className="collection-name">{collection.name}</span>
          <span className="collection-count">({collection.count})</span>
        </button>
      ))}
    </div>
    <button className="new-collection-button">
      <PlusIcon size={18} />
      <span>New Collection</span>
    </button>
  </div>
);

export default CollectionsSidebar;