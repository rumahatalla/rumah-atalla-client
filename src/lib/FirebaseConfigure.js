import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// // FCM
const firebaseConfig = {
  apiKey: "AIzaSyDdX_JzmN9mHVf_PhzihMMS_ZrCYboe8S8",
  authDomain: "test-raffi.firebaseapp.com",
  projectId: "test-raffi",
  storageBucket: "test-raffi.appspot.com",
  messagingSenderId: "67616117651",
  appId: "1:67616117651:web:d4faf171414641ab924e66",
  measurementId: "G-ETTVXTE6V6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
