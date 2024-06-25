import React, { useState, useEffect } from 'react';
import Stars from '../star/Stars';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import './Rating.css';

const Rating = ({ hostelId }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hostels/${hostelId}`);
        const hostel = response.data;
        const userRating = hostel.ratings?.find(r => r.userId === currentUser.uid);
        if (userRating) {
          setRating(userRating.rating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [hostelId, currentUser]);

  const handleRating = async (newRating) => {
    try {
      console.log("Submitting rating:", { userId: currentUser.uid, rating: newRating });

      const response = await axios.post(`http://localhost:5000/api/hostels/rate-hostel/${hostelId}`, {
        userId: currentUser.uid,
        rating: Number(newRating),
      });

      console.log("Rating response:", response.data);
      setRating(newRating);
      setEditMode(false);
    } catch (error) {
      console.error("Error rating hostel:", error);
      alert("Failed to rate hostel");
    }
  };

  return (
    <div className="rating-container">
      {rating && !editMode ? (
        <div className="user-rating">
          <p>Your rating for this hostel is {rating} stars</p>
          <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
        </div>
      ) : (
        <div>
          <Stars
            count={5}
            defaultRating={rating}
            icon="★"
            color="yellow"
            iconSize={24}
            onRating={handleRating}
          />
          {editMode && <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>}
        </div>
      )}
    </div>
  );
};

export default Rating;
