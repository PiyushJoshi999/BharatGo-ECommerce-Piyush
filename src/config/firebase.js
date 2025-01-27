// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa3TV1tayAAUixJPdSwVKhp6aCE4qaTXE",
  authDomain: "authentication-33b24.firebaseapp.com",
  projectId: "authentication-33b24",
  storageBucket: "authentication-33b24.firebasestorage.app",
  messagingSenderId: "4739420813",
  appId: "1:4739420813:web:f8dabd43410862acee88c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};