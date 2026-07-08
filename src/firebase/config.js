import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMy0UEJRkV2mO_twCy5r9rpYix9vjRCiM",
  authDomain: "oriontradehub-98d61.firebaseapp.com",
  projectId: "oriontradehub-98d61",
  storageBucket: "oriontradehub-98d61.firebasestorage.app",
  messagingSenderId: "205565734685",
  appId: "1:205565734685:web:4fb947445030ee28743bf4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;