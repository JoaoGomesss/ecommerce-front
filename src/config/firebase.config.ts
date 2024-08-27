import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFD2e2c86iCcnIF4DD6cJSMqGgLnAehNs",
  authDomain: "cosmo-ecommerce.firebaseapp.com",
  projectId: "cosmo-ecommerce",
  storageBucket: "cosmo-ecommerce.appspot.com",
  messagingSenderId: "398549865590",
  appId: "1:398549865590:web:ea6827dabd9e0651913b57",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
