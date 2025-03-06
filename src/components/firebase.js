// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (Make sure this matches your Firebase project settings)
const firebaseConfig = {
  apiKey: "AIzaSyD-7dNnY8qZQay37QeBwGv-Babk7rrvGSk",
  authDomain: "health-ai-b5f43.firebaseapp.com",
  projectId: "health-ai-b5f43",
  storageBucket: "health-ai-b5f43.appspot.com", // ✅ Fixed this
  messagingSenderId: "1012834424650",
  appId: "1:1012834424650:web:cb3d1bbf8f974c775953b3",
  measurementId: "G-F2FDZ7VQKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
