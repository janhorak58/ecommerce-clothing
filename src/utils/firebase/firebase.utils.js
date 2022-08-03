// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithRedirect,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLR3GVo2jIiXG58DMTNMK79uRcZwhXWd4",
  authDomain: "ecommerce-clothing-db-ed0d3.firebaseapp.com",
  projectId: "ecommerce-clothing-db-ed0d3",
  storageBucket: "ecommerce-clothing-db-ed0d3.appspot.com",
  messagingSenderId: "116111882843",
  appId: "1:116111882843:web:1e89403cd7278f21365d7e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("There was an error while creating a new user. \n", error);
    }
  }
  return userDocRef;
};
