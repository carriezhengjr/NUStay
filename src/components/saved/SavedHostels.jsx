import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Card from '../card/Card';
import './savedHostels.css';

const SavedHostels = () => {
  const { currentUser } = useAuth();
  const [savedHostels, setSavedHostels] = useState([]);

  useEffect(() => {
    const fetchSavedHostels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hostels');
        const hostels = await response.json();
        const userSavedHostels = hostels.filter(hostel => hostel.savedBy.includes(currentUser.uid));
        setSavedHostels(userSavedHostels);
      } catch (error) {
        console.error('Error fetching saved hostels:', error);
      }
    };

    fetchSavedHostels();
  }, [currentUser.uid]);

  return (
    <div className="saved-hostels-page">
      <h2>My Saved Hostels</h2>
      <div className="saved-hostels-container">
        {savedHostels.map(hostel => (
          <Card key={hostel._id} item={hostel} />
        ))}
      </div>
    </div>
  );
};

export default SavedHostels;
