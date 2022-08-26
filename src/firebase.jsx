import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9EWmeCBpq58Yf5EuOLwS8wmZe-8xMV_M",
  authDomain: "whats-app-clone-5cbed.firebaseapp.com",
  projectId: "whats-app-clone-5cbed",
  storageBucket: "whats-app-clone-5cbed.appspot.com",
  messagingSenderId: "595514316108",
  appId: "1:595514316108:web:6801efacf8d92ed5e9ebe9",
  measurementId: "G-XJHRXV905M",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
