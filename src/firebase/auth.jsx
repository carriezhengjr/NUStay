import { auth, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

// Upload function to handle profile photo upload
export const upload = async (file, currentUser, setLoading, setCurrentUser) => {
  if (!currentUser || !currentUser.uid) {
    console.error("Invalid currentUser:", currentUser);
    return;
  }

  const fileRef = ref(storage, `profile/${currentUser.uid}/${file.name}`);
  setLoading(true);

  try {
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(auth.currentUser, { photoURL });

    // Update the currentUser state with the new data
    setCurrentUser((prev) => ({ ...prev, photoURL }));

    setLoading(false);
    alert("Uploaded file! Refresh to see changes.");
  } catch (error) {
    setLoading(false);
    console.error("Error uploading file:", error);
    alert("Failed to upload file");
  }
};

// Function to handle username update
export const updateUsername = async (username, currentUser, setLoading, setCurrentUser) => {
  if (!currentUser || !currentUser.uid) {
    console.error("Invalid currentUser:", currentUser);
    return;
  }

  setLoading(true);

  try {
    await updateProfile(auth.currentUser, { displayName: username });

    // Update the currentUser state with the new data
    setCurrentUser((prev) => ({ ...prev, displayName: username }));

    setLoading(false);
    alert("Username updated! Refresh to see changes.");
  } catch (error) {
    setLoading(false);
    console.error("Error updating username:", error);
    alert("Failed to update username");
  }
};
