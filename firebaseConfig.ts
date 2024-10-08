import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAWrVnjzYynscaIwsqVZXNPfbPJST9X48",
  authDomain: "todofireapp-efbe5.firebaseapp.com",
  projectId: "todofireapp-efbe5",
  storageBucket: "todofireapp-efbe5.appspot.com",
  messagingSenderId: "448581803953",
  appId: "1:448581803953:web:ff162f514dd555ac842790"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
