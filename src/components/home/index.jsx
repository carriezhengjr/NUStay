import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import Map from '../map/Map';

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hostels');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const hostelsData = await response.json();
        console.log('Fetched hostels:', hostelsData); // test
        // Convert latitude and longitude to numbers if they are strings
      const numericHostelsData = hostelsData.map(hostel => ({
        ...hostel,
        latitude: parseFloat(hostel.latitude),
        longitude: parseFloat(hostel.longitude)
      }));
        setHostels(numericHostelsData);
      } catch (error) {
        setError(error.message);
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
          <div className="hostel-list">
            {error ? (
              <div>Error: {error}</div>
            ) : (
              hostels.map(hostel => (
                <div key={hostel._id} className="hostel-item">
                  <Link to={`/hostel/${hostel._id}`}>
                    <img src={hostel.imageUrl} alt={hostel.name} className="hostel-image" />
                    <div className="hostel-info">
                      <h3>{hostel.name}</h3>
                      <p>{hostel.type}</p>
                      <p>${hostel.price} / month</p>
                      <p>Average Rating: {hostel.averageRating}</p>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="map-explore-section">
          <h2>Explore</h2>
          <div className="map-container">
          <Map items={hostels} />
            <Link to="/explore-map">
              {/* <img src="path/to/your/map/image.png" alt="Explore map" className="map-image" /> */}
              {/* <p>Explore on map</p> */}
              <button className="map-button">Map</button>
            </Link>
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
