import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './HostelInfo.css';

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
      <div className="hostel-info-container">
        <div className="hostel-info-header">
          <h1>{hostel.name}</h1>
          <Link to="/home" className="home-button">Home</Link>
        </div>
        <div className="hostel-info-content">
          <img src={hostel.imageUrl} alt={hostel.name} className="hostel-info-image" />
          <div className="hostel-info-details">
            <p><strong>Type:</strong> {hostel.type}</p>
            <p><strong>Price:</strong> ${hostel.price} / month</p>
            <p><strong>Average Rating:</strong> {hostel.averageRating}</p>
            <p><strong>Description:</strong> {hostel.description}</p>
            <p><strong>Location:</strong> Latitude {hostel.latitude}, Longitude {hostel.longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelInfo;
