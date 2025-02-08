// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFGWx04zeN2MCwlC9wdJcEhYch1XxY_iQ",
  authDomain: "visitcounter-a5349.firebaseapp.com",
  databaseURL:
    "https://visitcounter-a5349-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "visitcounter-a5349",
  storageBucket: "visitcounter-a5349.firebasestorage.app",
  messagingSenderId: "894432464625",
  appId: "1:894432464625:web:fa15d05f9acdeb5fa2e350",
  measurementId: "G-WJGDZFJB40",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { database, ref, get, set };
