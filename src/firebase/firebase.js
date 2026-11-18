import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyA4q5hPvJb6ws-DnXZQ8DEQ5iVyfXxjaV4",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "ads-website-f3480.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "ads-website-f3480",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "ads-website-f3480.firebasestorage.app",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "879231448646",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:879231448646:web:c422912db0bde4f0b5bc47",
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "G-9H8S5QNPBS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
