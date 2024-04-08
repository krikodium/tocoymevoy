import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyByddeMXcspWoYXmIlS5wfvoSIntOHULp8",
    authDomain: "tocoymevoy-7aaac.firebaseapp.com",
    projectId: "tocoymevoy-7aaac",
    storageBucket: "tocoymevoy-7aaac.appspot.com",
    messagingSenderId: "784332240587",
    appId: "1:784332240587:web:ce0bca00a8e8c08fa38d4e",
    measurementId: "G-Q1VE8W6L16"
  };


app.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()
export const auth = firebase.auth()