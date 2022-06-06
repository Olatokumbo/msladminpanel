import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDilWROVVxuUFJ5rV1EsNCOqeiepK2CrLM",
  authDomain: "msladminpanel-6d733.firebaseapp.com",
  projectId: "msladminpanel-6d733",
  storageBucket: "msladminpanel-6d733.appspot.com",
  messagingSenderId: "773465114885",
  appId: "1:773465114885:web:2d5f2133c5c1f8fd618f6c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
