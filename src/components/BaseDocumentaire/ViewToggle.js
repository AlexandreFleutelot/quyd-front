import React from 'react';
import { List, LayoutGrid } from 'lucide-react';

const ViewToggle = ({ viewMode, onToggle }) => (
  <button
    onClick={() => onToggle(viewMode === 'grid' ? 'list' : 'grid')}
    className="icon-button"
  >
    {viewMode === 'grid' ? <List /> : <LayoutGrid />}
  </button>
);

export default ViewToggle;