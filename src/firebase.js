import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDobPePEN9QNHLRFRUtvgp7hpKn7gKYWNs",
    authDomain: "croso-worklog.firebaseapp.com",
    projectId: "croso-worklog",
    storageBucket: "croso-worklog.appspot.com",
    messagingSenderId: "19999382029",
    appId: "1:19999382029:web:2799634ac3e731ee915344",
    measurementId: "G-PDKES61H62"
  };

firebase.initializeApp(firebaseConfig)

export default firebase