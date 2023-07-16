import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_KEY,
  authDomain: "veronica-93c5d.firebaseapp.com",
  projectId: import.meta.env.VITE_REACT_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_FIREBASE_APP_ID,
};  

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

