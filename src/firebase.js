import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6TM-SMYOcagqNtX2qfH7MflVjQxTgE2Y",
  authDomain: "msladminpanel.firebaseapp.com",
  projectId: "msladminpanel",
  storageBucket: "msladminpanel.appspot.com",
  messagingSenderId: "171076725461",
  appId: "1:171076725461:web:47794fb59d798c0c3f505c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
