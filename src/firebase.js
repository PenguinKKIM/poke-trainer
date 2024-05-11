import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApcA4QuE7f4QOe0n9JrCww1Dhj1NduSDI",
  authDomain: "poke-trainer-c2836.firebaseapp.com",
  projectId: "poke-trainer-c2836",
  storageBucket: "poke-trainer-c2836.appspot.com",
  messagingSenderId: "811901346338",
  appId: "1:811901346338:web:430828bbff33f0a056e07b",
  measurementId: "G-ZBBNZV1RBZ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
