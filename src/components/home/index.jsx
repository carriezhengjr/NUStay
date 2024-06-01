import React from 'react'
import { useAuth } from '../../contexts/authContext'

const Home = () => {
    const { currentUser } = useAuth();
    const backgroundStyle = {
        height: '100vh', // Full viewport height
        backgroundImage: 'url("/utown.jpg")', // Path to your image in the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
    };
    const contentStyle = {
        background: 'rgba(0, 0, 0, 0.5)', // Black background with transparency
        padding: '20px',
        borderRadius: '10px',
    };
    return (
        <div style={backgroundStyle}>
            <div style={contentStyle}>
                <div className='text-2xl font-bold pt-14'>
                Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
                </div>
            </div>
        </div>
    );
};

export default Home