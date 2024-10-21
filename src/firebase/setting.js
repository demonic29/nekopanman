// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// import { getFIre }
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvk5FOmwBrC9mIvqOHrj_iE4wTxdDMSmg",
  authDomain: "nekopanman-f6ea9.firebaseapp.com",
  projectId: "nekopanman-f6ea9",
  storageBucket: "nekopanman-f6ea9.appspot.com",
  messagingSenderId: "592915998989",
  appId: "1:592915998989:web:d246d6f68deb637d5f2844",
  measurementId: "G-WWHJ5GJMEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);