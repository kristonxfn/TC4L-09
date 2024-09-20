 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
 import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
 
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

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

 const signIn = document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event) => {
   event.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const auth = getAuth();
 
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       const userEmail = user.email;
 
       // Check if the signed-in user has the authorized email address
       if (userEmail === 'kristondiscord@gmail.com') {
         // Authorized, redirect to admin dashboard
         localStorage.setItem('loggedInUserId', user.uid);
         window.location.href = '/TC4L-09/Frontend/Admin/adminhome.html';
       } else {
         // Not authorized, display error message
         showMessage('You are not authorized to access this page', 'signInMessage');
       }
     })
     .catch((error) => {
       const errorCode = error.code;
       if (errorCode === 'auth/invalid-credential') {
         showMessage('Incorrect Email or Password', 'signInMessage');
       } else {
         showMessage('Account does not Exist', 'signInMessage');
       }
     });
 });