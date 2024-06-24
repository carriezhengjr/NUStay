import { Link } from "react-router-dom";
import "./card.css";

function Card({ item }) {
  console.log("Image URL for item", item._id, ":", item.imageUrl); // Log the image URL to verify

  return (
    <div className="card">
      <Link to={`/hostel/${item._id}`} className="imageContainer">
        <img src={item.imageUrl} alt={item.name} />
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
              <span>{item.averageRating}</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;