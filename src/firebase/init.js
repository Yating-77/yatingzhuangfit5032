// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkFSZAcsa2tjHM_sobjvDGcnH7Km4zbew",
  authDomain: "week7-yating.firebaseapp.com",
  projectId: "week7-yating",
  storageBucket: "week7-yating.appspot.com",
  messagingSenderId: "601517685707",
  appId: "1:601517685707:web:fd6e6d2460499fc80ad44e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore database
export default db;
