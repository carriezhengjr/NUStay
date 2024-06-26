import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import apiRequest from "../../lib/apiRequest";
import "./card.css";

function Card({ item }) {
  const { currentUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentUser && item.savedBy.includes(currentUser.uid)) {
      setIsSaved(true);
    }
  }, [currentUser, item.savedBy]);

  const handleSave = async () => {
    if (!currentUser) return;

    setIsSaved((prev) => !prev);
    try {
      await apiRequest.post(`/hostels/save/${item._id}`, { userId: currentUser.uid });
    } catch (err) {
      console.error(err);
      setIsSaved((prev) => !prev);
    }
  };

  return (
    <div className="card">
      <Link to={`/hostel/${item._id}`} className="imageContainer">
        <img src={item.imageUrls[0]} alt={item.name} /> {/* Use the first image */}
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/hostel/${item._id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          <img src="/bed.png" alt="Location" />
          <span>{item.type}</span>
        </p>
        <p className="price">$ {item.price} / month</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/star.png" alt="Rating" />
              <span>{Number(item.averageRating).toFixed(1)} ({item.ratings.length})</span>
            </div>
          </div>
          <div className={`save-button ${isSaved ? "saved" : ""}`} onClick={handleSave}>
            <img src="/save.png" alt="Save" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
