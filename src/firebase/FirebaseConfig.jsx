// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJKUFP2-pJYgYm-gNYCPSQSH-zyQfOufg",
  authDomain: "projectapp-cf341.firebaseapp.com",
  projectId: "projectapp-cf341",
  storageBucket: "projectapp-cf341.appspot.com",
  messagingSenderId: "805761417807",
  appId: "1:805761417807:web:0de8124754e937985ba03a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}