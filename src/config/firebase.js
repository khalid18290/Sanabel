import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAs1mivP9UUx9VYzcbvlja_fSBFatdNDnw",
    authDomain: "fir-sanabel.firebaseapp.com",
    projectId: "fir-sanabel",
    storageBucket: "fir-sanabel.appspot.com",
    messagingSenderId: "1011229331279",
    appId: "1:1011229331279:web:1b26b5cd4258256f927f3a",
    measurementId: "G-CEJPJC5X4R"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); 