import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { upload, updateUsername } from "../../firebase/auth"; // Import the updateUsername function
import "./profile.css";

export default function Profile() {
  const { currentUser, setCurrentUser } = useAuth(); // Extract setCurrentUser to update state
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [username, setUsername] = useState(currentUser?.displayName || "");
  const [usernameLoading, setUsernameLoading] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0])); // Preview the selected image
    }
  }

  async function handleUpload() {
    await upload(photo, currentUser, setLoading, setCurrentUser);
  }

  async function handleUsernameUpdate() {
    setUsernameLoading(true);
    await updateUsername(username, currentUser, setUsernameLoading, setCurrentUser);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
    if (currentUser?.displayName) {
      setUsername(currentUser.displayName);
    }
  }, [currentUser]);

  return (
    <div className="fields">
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter your username"
        disabled={usernameLoading}
      />
      <button 
        className={usernameLoading ? 'disabled' : ''} 
        disabled={usernameLoading} 
        onClick={handleUsernameUpdate}
      >
        Update Username
      </button>
      <label htmlFor="fileInput" className={`choose-file-button ${loading ? 'disabled' : ''}`}>
        Choose File
        <input id="fileInput" type="file" onChange={handleChange} disabled={loading} />
      </label>
      <button 
        className={loading ? 'disabled' : ''} 
        disabled={loading || !photo} 
        onClick={handleUpload}
      >
        Upload Photo
      </button>
      <div className="avatar-container">
        <img src={photoURL} alt="Avatar" className="avatar" />
      </div>
    </div>
  );
}
