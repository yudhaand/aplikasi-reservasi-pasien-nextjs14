// src/firebase/auth.js
import { auth } from "./config";
import { onAuthStateChanged } from "firebase/auth";

export const authStateListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      callback(user);
    } else {
      // User is signed out
      callback(null);
    }
  });
};
