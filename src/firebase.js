import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDdO5UNl1fLBGITW3UyQ-zeTtnpG27k5yI",
  authDomain: "fridge2pan.firebaseapp.com",
  projectId: "fridge2pan",
  storageBucket: "fridge2pan.appspot.com",
  messagingSenderId: "344512198530",
  appId: "1:344512198530:web:003fb194cd773af08d419b"
};  

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

