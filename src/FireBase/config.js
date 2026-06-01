// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgWge_2G7_NAUKNMC-0YG6tC2Zpsr3Cys",
  authDomain: "web-probando.firebaseapp.com",
  projectId: "web-probando",
  storageBucket: "web-probando.firebasestorage.app",
  messagingSenderId: "299760291959",
  appId: "1:299760291959:web:5c0461c7aff8cc23ffb672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);