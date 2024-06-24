import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import List from '../list/List';
import Map from '../map/Map';
import './home.css';

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hostels');
        const data = await response.json();
        data.sort((a, b) => b.averageRating - a.averageRating);
        setHostels(data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-page">
      <header className="header">
        <h1>NUStay</h1>
      </header>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search hostel"
          className="search-bar"
          disabled
        />
        <div className="filter-container">
          <input type="text" placeholder="Min Price" className="filter-input" disabled />
          <input type="text" placeholder="Max Price" className="filter-input" disabled />
          <input type="text" placeholder="Room Type" className="filter-input" disabled />
          <button className="filter-button" disabled>Filter</button>
        </div>
      </div>
      <div className="main-content">
        <div className="hostel-list-section">
          <h2>Top rated hostels in NUS</h2>
          <List posts={hostels} />
        </div>
        <div className="map-explore-section">
          <h2>Map</h2>
          <div className="map-container">
          <Map items={hostels} />
            {/* <Link to="/explore-map">
              <img src="path/to/your/map/image.png" alt="Explore map" className="map-image" />
              <p>Explore on map</p>
            </Link> */}
            
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