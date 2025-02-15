/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
