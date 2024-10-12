import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBAWrVnjzYynscaIwsqVZXNPfbPJST9X48',
  authDomain: 'todofireapp-efbe5.firebaseapp.com',
  projectId: 'todofireapp-efbe5',
  storageBucket: 'todofireapp-efbe5.appspot.com',
  messagingSenderId: '448581803953',
  appId: '1:448581803953:web:ff162f514dd555ac842790',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
