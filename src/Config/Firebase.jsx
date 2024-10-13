// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Storage

const firebaseConfig = {
    apiKey: "AIzaSyBc71k-6UZMDJlVIjFFzmSLe-HtZiacQ4A",
    authDomain: "kitaabi-b3281.firebaseapp.com",
    projectId: "kitaabi-b3281",
    storageBucket: "kitaabi-b3281.appspot.com",
    messagingSenderId: "601869666091",
    appId: "1:601869666091:web:1503c14415f8568ea9e76e",
    measurementId: "G-66NXMRX7FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage }; // Export storage
