// api.js
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const apiURL = import.meta.env.VITE_REACT_API_URL;
const apiKey = import.meta.env.VITE_REACT_API_KEY;
const apiOrg = import.meta.env.VITE_REACT_API_ORG;
const apiModel = import.meta.env.VITE_REACT_API_MODEL;

const fbKey = import.meta.env.VITE_REACT_FIREBASE_KEY;
const appID = import.meta.env.VITE_REACT_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: "AIzaSyAJp-B5VI0TpypfrhswuFmUDRnw8agPgBA",
  authDomain: "veronica-93c5d.firebaseapp.com",
  projectId: "veronica-93c5d",
  storageBucket: "veronica-93c5d.appspot.com",
  messagingSenderId: "713722133048",
  appId: {appID}
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}
