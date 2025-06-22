import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQdhGgU6SYUilGiLJpQjYT3PvOhGRyGog",
  authDomain: "rentingstar-e7d68.firebaseapp.com",
  projectId: "rentingstar-e7d68",
  storageBucket: "rentingstar-e7d68.firebasestorage.app",
  messagingSenderId: "1085616256930",
  appId: "1:1085616256930:web:3f6f9720077aee7d39a4fb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
