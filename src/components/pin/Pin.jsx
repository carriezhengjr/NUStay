import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import './pin.scss';
import { Link } from 'react-router-dom';

function Pin({ items }) {
  const position = [items[0].latitude, items[0].longitude];

  return (
    <Marker position={position}>
      <Popup>
        <div className="popupContainer">
          {items.map(item => (
            <div key={item._id} className="popupItem">
              <div className="textContainer">
                <Link to={`/hostel/${item._id}`}>{item.name}</Link>
                <span>{item.type} type</span>
                <p>${item.price} / month</p>
                <b>Rating: {Number(item.averageRating).toFixed(1)} ({item.ratings.length})</b>
              </div>
            </div>
          ))}
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
