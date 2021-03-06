import * as firebase from 'firebase';
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyDxIzefJizL0TgME0W2O7DOOj8-klrsNdo",
    authDomain: "q-app-7ee6e.firebaseapp.com",
    databaseURL: "https://q-app-7ee6e.firebaseio.com",
    projectId: "q-app-7ee6e",
    storageBucket: "q-app-7ee6e.appspot.com",
    messagingSenderId: "577286020518",
    appId: "1:577286020518:web:cf679ba4229405c2b24367",
    measurementId: "G-89D52WNSCB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//for image uploading to firebase
const storage = firebase.storage()

function User(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
}

function LogIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

function FbSignIn(provider) {
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
}

function GoogleSignIn(googleProvider) {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
}

// function imagesUrl(imageUrl){

//     return  storage.ref('images').child().getDownloadURL()
// }

export {
    User,
    LogIn,
    FbSignIn,
    GoogleSignIn,
    storage
}
export default firebase