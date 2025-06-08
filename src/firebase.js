import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB3O_hyWI0Z1_FOaSSKhUkoGlij37ONPzE",
    authDomain: "ecommerce-7bec2.firebaseapp.com",
    projectId: "ecommerce-7bec2",
    storageBucket: "ecommerce-7bec2.firebasestorage.app",
    messagingSenderId: "762105907889",
    appId: "1:762105907889:web:8ec1f24fcbc75fd15fb090"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword };