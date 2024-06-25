import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HostelInfo.css';
import Comments from './Comments';
import Rating from '../rating/Rating';
import Map from '../map/Map';

const HostelInfo = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hostels/${id}`);
        const data = await response.json();
        setHostel(data);
      } catch (error) {
        console.error('Error fetching hostel:', error);
      }
    };

    fetchHostel();
  }, [id]);

  if (!hostel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hostel-info-page">
      <div className="hostel-info-left">
        <div className="hostel-info-image">
          <img src={hostel.imageUrl} alt={hostel.name} />
        </div>
        <div className="hostel-info-details">
          <h1 className="title"><strong>{hostel.name}</strong></h1>
          <p><strong>Type:</strong> {hostel.type}</p>
          <p><strong>Price:</strong> ${hostel.price} / month</p>
          <p><strong>Average rating:</strong> {Number(hostel.averageRating).toFixed(1)}</p>
          <p><strong>Description:</strong> {hostel.description}</p>
          <Rating hostelId={id} />
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
