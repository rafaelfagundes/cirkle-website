// import "firebase/analytics";
import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/remote-config";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB6soooBfHdrcL6q1Fy82Cbk5Zur-pWPw0",
    authDomain: "cirklebr.firebaseapp.com",
    databaseURL: "https://cirklebr.firebaseio.com",
    projectId: "cirklebr",
    storageBucket: "cirklebr.appspot.com",
    messagingSenderId: "597056782213",
    appId: "1:597056782213:web:948ff6297ea4642d458eec",
    measurementId: "G-SGN34W90KP",
  });
}

// TODO
// As httpOnly cookies are to be used, do not persist any state client side.
// firebase.auth().setPersistence(firebase.auth.Auth?.Persistence?.NONE);

export default firebase;
