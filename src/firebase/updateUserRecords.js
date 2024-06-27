import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const updateUserRecords = (collectionName, uid, updatedObj) => {
  const userDocRef = doc(db, collectionName, uid);
  return setDoc(userDocRef, updatedObj, { merge: true });
};

export default updateUserRecords;
