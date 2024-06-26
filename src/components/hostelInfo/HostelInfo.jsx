import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HostelInfo.css';
import Comments from './Comments';
import Rating from '../rating/Rating';
import Map from '../map/Map';
import Slider from '../slider/Slider';
import { useAuth } from '../../contexts/authContext';

const HostelInfo = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [hostel, setHostel] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hostels/${id}`);
        const data = await response.json();
        setHostel(data);
        setIsSaved(data.savedBy.includes(currentUser.uid));
      } catch (error) {
        console.error('Error fetching hostel:', error);
      }
    };

    fetchHostel();
  }, [id, currentUser.uid]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/hostels/save/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.uid }),
      });
      const data = await response.json();
      setIsSaved(data.savedBy.includes(currentUser.uid));
    } catch (error) {
      console.error('Error saving hostel:', error);
    }
  };

  if (!hostel) {
    return <div>Loading...</div>;
  }

  const numberOfRatings = hostel.ratings.length;

  return (
    <div className="hostel-info-page">
      <div className="hostel-info-left">
        <h1 className="title"><strong>{hostel.name}</strong></h1>
        <div className="hostel-info-image">
          <Slider images={hostel.imageUrls} />
        </div>
        <div className="hostel-info-details">
          <p><strong>Type:</strong> {hostel.type}</p>
          <p><strong>Price:</strong> ${hostel.price} / month</p>
          <p><strong>Average rating:</strong> {Number(hostel.averageRating).toFixed(1)} ({numberOfRatings})</p>
          <p><strong>Description:</strong> {hostel.description}</p>
          <Rating hostelId={id} />
          <div className={`save-button-container ${isSaved ? 'saved' : ''}`} onClick={handleSave}>
            <span>{isSaved ? 'Hostel saved ' : 'Save this hostel '}</span>
            <img src="/save.png" alt="Save" />
          </div>
        </div>
      </div>
      <div className="hostel-info-right">
        <div className="map-container">
          <Map items={[hostel]} />
        </div>
        <div className="comments-container">
          <Comments postId={id} />
        </div>
      </div>
    </div>
  );
};

export default HostelInfo;
