// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDm4V9_Zla7R-JNaKoS5Ow3hLxUaKYng4",
    authDomain: "gymtools-cc784.firebaseapp.com",
    projectId: "gymtools-cc784",
    storageBucket: "gymtools-cc784.appspot.com",
    messagingSenderId: "202841801728",
    appId: "1:202841801728:web:b959c455c29ead107684e5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);