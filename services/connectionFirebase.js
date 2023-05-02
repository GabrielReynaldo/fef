
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';

let firebaseConfig = {
  apiKey: "AIzaSyD53IWcjaze6iw44D1a_2Z7p1lgzsbi9-A",
  authDomain: "gabigodecar.firebaseapp.com",
  projectId: "gabigodecar",
  storageBucket: "gabigodecar.appspot.com",
  messagingSenderId: "981132527056",
  appId: "1:981132527056:web:3af49264950451026f65d5",
  databaseURL:"https://gabigodecar-default-rtdb.firebaseio.com/"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export default firebase;