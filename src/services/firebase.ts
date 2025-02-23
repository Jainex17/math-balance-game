import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

export const saveLevelCompletion = async (levelNumber: number) => {
  try {
    const userId = auth.currentUser?.uid || '';
    
    const userProgress = {
      userId: userId,
      userName: auth.currentUser?.displayName || '',
      userEmail: auth.currentUser?.email || '',
      userCurrentLevel: levelNumber+1,
      updatedAt: new Date().toISOString()
    };
    
    if (userId === '') {
      console.error('No user is currently logged in');
      return;
    }
    await setDoc(doc(db, 'userProgress', userId), userProgress, { merge: true });
    console.log('Level completion saved successfully');
  } catch (error) {
    console.error('Error saving level completion:', error);
    throw error;
  }
};

export const getUserProgress = async () => {
  try {
    const userId = auth.currentUser?.uid || '';
    
    if (userId === '') {
      console.error('No user is currently logged in');
      return;
    }

    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressSnapshot = await getDoc(userProgressRef);
    
    if (userProgressSnapshot.exists()) {
      return userProgressSnapshot.data();
    }

    return null;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
}
