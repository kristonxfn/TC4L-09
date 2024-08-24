import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBK4x087mtwGGUj7AsrNs0xzJsrhu2OoVQ",
    authDomain: "garage-form.firebaseapp.com",
    projectId: "garage-form",
    storageBucket: "garage-form.appspot.com",
    messagingSenderId: "557862900022",
    appId: "1:557862900022:web:6efd51cf1d2ff8ebf62397"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  const loginButton=document.getElementById('login');

  loginButton.addEventListener('click', () => {
    // Assuming you have a login function that returns a promise
    loginFunction()
      .then(() => {
        window.location.href = '/Backend/index.html';
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  });
  
  
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const userRef = db.collection('users').doc(loggedInUserId);
    userRef.get()
      .then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.querySelector('loggedUser').innerText = userData.userName;
        } else {
          console.log('User data not found');
          document.getElementById('loggedUser').innerText = '';
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        document.getElementById('loggedUser').innerText = '';
      });
  } else {
    // User is signed out
    document.getElementById('loggedUser').innerText = '';
  }
});