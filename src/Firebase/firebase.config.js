// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA40VHuoMfuVxJzl7vto9vzSoR_NbZ8qho",
  authDomain: "email-pass-auth-3cf60.firebaseapp.com",
  projectId: "email-pass-auth-3cf60",
  storageBucket: "email-pass-auth-3cf60.appspot.com",
  messagingSenderId: "271914285773",
  appId: "1:271914285773:web:0459ec6c2b443ff6bcc784"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default(app)