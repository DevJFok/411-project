// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXeVwtf-rTMD4Yv9t1rSnSYRnoQvW37_s",
  authDomain: "project-3b34b.firebaseapp.com",
  projectId: "project-3b34b",
  storageBucket: "project-3b34b.appspot.com",
  messagingSenderId: "953954759325",
  appId: "1:953954759325:web:43cae51baa36e23175da74",
  measurementId: "G-0E67JE6QE3",
  databaseURL: "https://project-3b34b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
firebase.auth().useDeviceLanguage();
document.getElementById("login").addEventListener('click', (e) => {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
});


/*
const db = getDatabase(app);
//const auth = getAuth(app);
const firebaseRef = ref(db, 'student');
console.log(firebaseRef);

*/



