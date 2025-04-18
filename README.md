# React-native TO-DO App

This React Native app uses Firebase for storing and managing the to-do list. It allows users to add, read, update, and delete to-dos from a Firestore database.

### CRUD Operations
1. Create: Ability to add new items to the to-do list.
2. Read: Fetch and display the list of to-dos from Firebase in real-time.
3. Update: Toggle the completion status of a to-do item.
4. Delete: Remove a to-do item from the list.

### Firebase Firestore
- Use Firestore as the backend to store and manage the to-do items.

### Real-time Updates
- The app should reflect real-time changes, such as when an item is added, updated, or deleted.

# Project Breakdown

## Firebase Setup
- Set up Firebase in your project and configure it with your project details like API key, project ID, etc.
- Initialize Firestore to interact with the database.

## Package Installation

### if you haven't already, create an Expo project
```npx create-expo-app@latest react-project-name -t expo-template-blank-typescript```

### Install the necessary packages for Firebase and React Navigation:
```
expo install @react-native-firebase/app @react-native-firebase/firestore
expo install @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-safe-area-context
```

### Set Up Firebase
- Create a new file firebaseConfig.ts and add your Firebase configuration, for example:
```
// firebaseConfig.ts
import { FirebaseOptions, initializeApp } from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

initializeApp(firebaseConfig);

export const db = firestore();
```
### Configure Metro
- Expo CLI uses Metro (The JavaScript bundler for React Native) to bundle your JavaScript code and assets, and add support for more file extensions.

```
npx expo customize metro.config.js
```
Then, update the file with the following configuration:
```
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
```

### To-Do List Component
- Define a component (TodoList.tsx) that will handle displaying the list of to-dos.
- Manage the state of to-do items and input for new to-dos.
- Use Firestore to fetch, add, update, and delete to-do items.
- Render the list of items with options to toggle their completion status and delete them.

### Run the Application
- This project is developed using Android Studio and iOS.

```yarn start```

### Authentication
- Implemented user sign-up, login, and logout functionality using Firebase authentication.

### Expo prebuild
- To set up the Android and iOS folders for generating IPA and APK files.

#### When initially generating the Android/iOS native project folders
- If you run this command while working, your custom app icons/title will be lost.
- ```npx expo prebuild```

#### Then for each build:
- ```cd android```

- ```./gradlew clean``` # optional

- ```./gradlew assembleRelease```

#### Find the APK file

```android > app > build > outputs > apk > release```
