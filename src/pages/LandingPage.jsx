import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '2em',
      backgroundImage: "url('/utown.jpg')", // Path to your background image relative to the public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '0px', // Rounded corners for the box
      // padding: '2em',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Half-transparent white background
        borderRadius: '50px', // Rounded corners for the box
        padding: '2em',
        marginTop: '1em', // Adjusted margin top to reduce space
      }}>
        <h1 style={{ fontSize: '4em', color: 'black', marginBottom: '0em', marginTop: '0em' }}>NUStay</h1>
        <p style={{ marginBottom: '1em', marginTop: '0em', color: '#888' }}>
          Are you ready to find the perfect hostel<br />
          and start your university journey?<br />
          NUStay will guide you every step of the way!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={navigateToLogin} style={{ width: '80%', padding: '1em', margin: '0.5em', borderRadius: '20px', background: 'linear-gradient(to bottom, #917afd, #6246ea)', color: 'white' }}>
            Log In
          </button>
          <button onClick={navigateToSignUp} style={{ width: '80%', padding: '1em', margin: '0.5em', borderRadius: '20px', backgroundColor: 'transparent', color: 'black', border: 'none' }}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
