import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB7IBnJIA287iyTBP-7Dinlc8fg0VAki1I",
    authDomain: "react-firebase-dc578.firebaseapp.com",
    projectId: "react-firebase-dc578",
    storageBucket: "react-firebase-dc578.appspot.com",
    messagingSenderId: "504517177335",
    appId: "1:504517177335:web:5ead2d3ba2986af88188f2",
    measurementId: "G-DQRV4985V9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth, provider }