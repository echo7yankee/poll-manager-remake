import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDS8WVTIvqG7IavhZ_6c8u1w1fMc0iSrtY",
  authDomain: "react-redux-firebase-mar-d2ca8.firebaseapp.com",
  databaseURL: "https://react-redux-firebase-mar-d2ca8.firebaseio.com",
  projectId: "react-redux-firebase-mar-d2ca8",
  storageBucket: "react-redux-firebase-mar-d2ca8.appspot.com",
  messagingSenderId: "1082874868565"
};
firebase.initializeApp(config);

export default firebase;
