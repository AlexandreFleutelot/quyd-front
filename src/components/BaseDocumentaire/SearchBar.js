import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => (
  <div className="search-container">
    <Search className="search-icon" />
    <input
      type="text"
      placeholder="Search documents..."
      className="search-input"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default SearchBar;