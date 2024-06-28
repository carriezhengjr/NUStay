import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useHostels } from '../../contexts/HostelContext';
import List from '../list/List';
import Map from '../map/Map';
import SearchBar from '../searchBar/SearchBar'; 
import './home.css';

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const { hostels, setHostels, filteredHostels, setFilteredHostels } = useHostels();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hostels');
        const data = await response.json();
        data.sort((a, b) => b.averageRating - a.averageRating);
        setHostels(data);
        
        // Check if there's filtered data in local storage
        const storedFilteredHostels = localStorage.getItem('filteredHostels');
        if (storedFilteredHostels) {
          setFilteredHostels(JSON.parse(storedFilteredHostels));
        } else {
          setFilteredHostels(data);
        }
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, [setHostels, setFilteredHostels]);

  useEffect(() => {
    console.log('Filtered Hostels:', filteredHostels);
  }, [filteredHostels]);

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleSearch = (filteredData) => {
    setFilteredHostels(filteredData);
  };

  const handleFilterClick = () => {
    navigate('/filter');
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>NUStay</h1>
      </header>
      
      <div className="search-bar-container"> 
        <SearchBar hostels={hostels} setFilteredHostels={handleSearch} />
        <button className="filter-button" onClick={handleFilterClick}>
          Filter
        </button>
      </div>
      
      <div className="main-content">
        <div className="hostel-list-section">
          <h2>Top rated hostels in NUS</h2>
          <List posts={filteredHostels} />
        </div>
        <div className="map-explore-section">
          <h2>Map</h2>
          <div className="map-container">
            <Map items={filteredHostels} />
          </div>
        </div>
      </div>
      <div className="login-info">
        Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
      </div>
    </div>
  );
};

export default Home;
