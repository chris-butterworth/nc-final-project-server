// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1iEBJs7SC5doNF_mvYunUtg_ZzcT73fU",
  authDomain: "nc-final-project-auth.firebaseapp.com",
  projectId: "nc-final-project-auth",
  storageBucket: "nc-final-project-auth.appspot.com",
  messagingSenderId: "790312033966",
  appId: "1:790312033966:web:9bc474bcc4f14ad3eb973f",
  measurementId: "G-67W2P97KKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);