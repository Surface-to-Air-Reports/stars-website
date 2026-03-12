// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN0N4dBnRAD_pKzIBe9sAVaaTUhGOUAYQ",
    authDomain: "stars80027.firebaseapp.com",
    projectId: "stars80027",
    storageBucket: "stars80027.firebasestorage.app",
    messagingSenderId: "1093719042220",
    appId: "1:1093719042220:web:e6e1e5d013f590a153d709"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}