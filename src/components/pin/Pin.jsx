import React from 'react';
import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          {/* <img src={item.imageUrl} alt="item.name" /> */}
          <div className="textContainer">
            <Link to={`/hostel/${item._id}`}>{item.name}</Link>
            <span>{item.type} type</span>
            <p>${item.price} / month</p>
            <b>Rating: {item.averageRating}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;