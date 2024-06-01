import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot Password clicked');
  };

  return (
    <div style={{ 
      maxWidth: '2000px', 
      margin: 'auto', 
      padding: '1em', 
      textAlign: 'center', 
      backgroundImage: "url('/utown.jpg')", // Path to your background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the background covers the entire viewport height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '1em', borderRadius: '50px', width: '25%' }}>
        <h1>Welcome Back!</h1>
        <p style={{ color: '#888', margin: '1em 2em' }}>NUStay - Log In to your NUStay account to explore your dream hostel in NUS!</p>
        <div style={{ width: '80%', margin: 'auto' }}> {/* Container div */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1em', textAlign: 'left' }}> {/* Align labels to the left */}
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '0.5em',
                  borderRadius: '20px', // Rounded corners
                  border: '1px solid #ccc', // Border
                  marginBottom: '0.5em' // Spacing
                }}
              />
            </div>
            <div style={{ marginBottom: '1em', textAlign: 'left' }}> {/* Align labels to the left */}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '0.5em',
                  borderRadius: '20px', // Rounded corners
                  border: '1px solid #ccc', // Border
                  marginBottom: '0.5em' // Spacing
                }}
              />
            </div>
            <button type="submit" style={{ 
              display: 'block', 
              width: '100%', 
              padding: '0.5em', 
              marginBottom: '0.5em', 
              borderRadius: '20px', // Rounded corners
              background: 'linear-gradient(to bottom, #917afd, #6246ea)', 
              color: 'white', 
              border: 'none' 
            }}>
              Log In
            </button>
          </form>
          <button onClick={handleForgotPassword} style={{ 
            display: 'block', 
            width: '100%', 
            padding: '0.5em', 
            borderRadius: '20px', // Rounded corners
            backgroundColor: 'transparent', 
            color: '#888', 
            border: 'none' 
          }}>
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
