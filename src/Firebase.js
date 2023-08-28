import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDcsytK_yS8oZ36ugYq1IHGlCuh-8v4uLo",
  authDomain: "serch-images.firebaseapp.com",
  projectId: "serch-images",
  storageBucket: "serch-images.appspot.com",
  messagingSenderId: "52404728869",
  appId: "1:52404728869:web:a3fc073a24eb8c00367bcc",
  measurementId: "G-1PT6WKEQVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
