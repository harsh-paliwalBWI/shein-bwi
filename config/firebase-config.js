import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyCYDciCKPG98HiHFHXyGVQ2M-4864h8WtY",
  authDomain: "bwi-alpha.firebaseapp.com",
  projectId: "bwi-alpha",
  storageBucket: "bwi-alpha.appspot.com",
  messagingSenderId: "794276744477",
  appId: "1:794276744477:web:2ab26781eec4feb29c65f4",
  measurementId: "G-2XBBKV006Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
