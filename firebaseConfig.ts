// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB2rX7SgScWPLeofZ9UWymICV7cLbKSCSI",
  authDomain: "bdpm-331ad.firebaseapp.com",
  projectId: "bdpm-331ad",
  storageBucket: "bdpm-331ad.firebasestorage.app",
  messagingSenderId: "203145900004",
  appId: "1:203145900004:web:02baaa50e05d9f6a6ce1f1",
  measurementId: "G-P2SDKHL478"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
