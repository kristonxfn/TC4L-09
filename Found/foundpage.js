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
 const signUp = document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event) => {
   event.preventDefault();
   const email = document.getElementById('rEmail').value;
   const password = document.getElementById('rPassword').value;
   const userName = document.getElementById('userName').value;
   const foundAt = document.getElementById('foundAt').value.trim();
   const timeFound = document.getElementById('timeFound').value.trim();
   const item = document.getElementById('item').value.trim();
   const founderName = document.getElementById('founderName').value.trim();
   const contact = document.getElementById('contact').value.trim();
 
   const auth = getAuth();
   const db = getFirestore();
   const foundItemsCollection = collection(db, 'foundItems');
 
   createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       const userData = {
         email: email,
         userName: userName,
       };
 
       const foundItem = {
         foundAt,
         timeFound,
         item,
         founderName,
         contact
       };
 
       addDoc(foundItemsCollection, foundItem)
         .then((docRef) => {
           console.log(`Document written with ID: ${docRef.id}`);
           showMessage('Item added successfully', 'itemMessage');
         })
         .catch((error) => {
           console.error(`Error adding item: ${error}`);
           showMessage('Error adding item', 'itemMessage');
         });
 
       setDoc(doc(db, "users", user.uid), userData)
         .then(() => {
           window.location.href = 'index.html';
         })
         .catch((error) => {
           console.error("error writing document", error);
         });
     })
     .catch((error) => {
       const errorCode = error.code;
       if (errorCode == 'auth/email-already-in-use') {
         showMessage('Email Address Already Exists !!!', 'signUpMessage');
       } else {
         showMessage('unable to create User', 'signUpMessage');
       }
     });
 });
 