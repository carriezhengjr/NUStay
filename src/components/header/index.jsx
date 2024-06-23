import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import './navbar.css'; // Import the new CSS file

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/utown.jpg" alt="Logo" />
          <span>NUStay</span>
        </Link>
        <Link to="/home" className="nav-button">Home</Link>
        <a href="/" className="nav-button">Explore</a>
        <a href="/" className="nav-button">Saved</a>
        <a href="/" className="nav-button">About</a>
      </div>
      <div className="right">
        {userLoggedIn ? (
          <>
            <button
              onClick={() => { doSignOut().then(() => { navigate('/login'); }); }}
              className="nav-button"
            >
              Logout
            </button>
            <div className="user">
              <img
                src="https://images.pexels.com/photos/91226/pexels-photo-91226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="User"
              />
              <span>{currentUser.displayName ? currentUser.displayName : currentUser.email}</span>
              <Link to="/profile" className="profile nav-button">
                <div className="notification">1</div>
                <span>Profile</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">Sign in</Link>
            <Link to="/register" className="nav-button register">Sign up</Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu"
            onClick={() => setOpen(prev => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/home">Home</Link>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
