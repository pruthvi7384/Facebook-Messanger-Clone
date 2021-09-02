import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDICIR8rs9x9koSSIlJR9nhuBQzNUST5vw",
  authDomain: "messenger-app-816c8.firebaseapp.com",
  projectId: "messenger-app-816c8",
  storageBucket: "messenger-app-816c8.appspot.com",
  messagingSenderId: "1070220937664",
  appId: "1:1070220937664:web:3bf3dda816f45bb53f2025"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db