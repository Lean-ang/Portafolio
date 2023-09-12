// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7vA19b6qMkjzvsYwWRQNGBnr-1zKFhdc",
  authDomain: "sonar-angelico.firebaseapp.com",
  projectId: "sonar-angelico",
  storageBucket: "sonar-angelico.appspot.com",
  messagingSenderId: "1058114882363",
  appId: "1:1058114882363:web:f98d46f9dba6c9ac15451e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirestore = () => app