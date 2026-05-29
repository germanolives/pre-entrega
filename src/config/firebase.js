import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBPkHYkWpduM6bOW3sYTWzWtWeXe4dMciU",
  authDomain: "talento-tech-react-5645e.firebaseapp.com",
  projectId: "talento-tech-react-5645e",
  storageBucket: "talento-tech-react-5645e.firebasestorage.app",
  messagingSenderId: "292547743567",
  appId: "1:292547743567:web:cc5a5e094c87cc2b483f3a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
