import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-VLk5A7G-OjvNZp_xmOO5n1yLtfLFoF8",
  authDomain: "derschatapp.firebaseapp.com",
  projectId: "derschatapp",
  storageBucket: "derschatapp.firebasestorage.app",
  messagingSenderId: "903020849368",
  appId: "1:903020849368:web:d74e8cc2af3dc660ce0fad",
  measurementId: "G-N5BJTEXGHB"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");

export default app;