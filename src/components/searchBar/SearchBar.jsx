import React, { useState } from 'react';
import './searchBar.scss';

const SearchBar = ({ hostels, setFilteredHostels }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = hostels.filter((hostel) =>
      hostel.name.toLowerCase().includes(term) || hostel.type.toLowerCase().includes(term)
    );

    setFilteredHostels(filtered);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search hostel by name or type"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
