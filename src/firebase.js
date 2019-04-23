import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDW2ddJ2PEgPGYnNAi4pLwVj23hQpdk2CQ",
  authDomain: "react-slack-clone-4853d.firebaseapp.com",
  databaseURL: "https://react-slack-clone-4853d.firebaseio.com",
  projectId: "react-slack-clone-4853d",
  storageBucket: "react-slack-clone-4853d.appspot.com",
  messagingSenderId: "902007174855"
};

firebase.initializeApp(config);

export default firebase;
