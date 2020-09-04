import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAxQMWUM5N2il5VFHmb9763a-HPKjbYmxk",
    authDomain: "financeapp-3defb.firebaseapp.com",
    databaseURL: "https://financeapp-3defb.firebaseio.com",
    projectId: "financeapp-3defb",
    storageBucket: "financeapp-3defb.appspot.com",
    messagingSenderId: "815963685880",
    appId: "1:815963685880:web:7627a39481f2ff2cb1cc0d",
    measurementId: "G-6H9L6R4FHZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// function User(email, password) {
//     return firebase.auth().createUserWithEmailAndPassword(email, password)
// }

function LogIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

function FbSignIn(provider) {
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
}

export {
    // User,
    LogIn,
    FbSignIn,
    firebase
}