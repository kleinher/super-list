import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZfWL3ne-zkCHWYO0lj343YT0Sr3XJe9s",
  authDomain: "super-app-6fbda.firebaseapp.com",
  databaseURL: "https://super-app-6fbda-default-rtdb.firebaseio.com",
  projectId: "super-app-6fbda",
  storageBucket: "super-app-6fbda.appspot.com",
  messagingSenderId: "252152690839",
  appId: "1:252152690839:web:237fc5a539dce9ce0d51d2",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export function firebaseAuth({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password);
}
