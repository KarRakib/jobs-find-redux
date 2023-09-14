// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1mtsXw4M-T1LGiyWGHnk03_C1osBd3_U",
  authDomain: "redux-app-f6d71.firebaseapp.com",
  projectId: "redux-app-f6d71",
  storageBucket: "redux-app-f6d71.appspot.com",
  messagingSenderId: "441475717769",
  appId: "1:441475717769:web:53e745b7d802669185c458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)