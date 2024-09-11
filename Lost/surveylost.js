import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
// import { getFirestore, setDoc, doc, } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js"
 
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

const lostItem = doc(db,"users",)

const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const name=document.getElementById('name').value;
    const phoneNumber=document.getElementById('phoneNumber').value;
    const lostItem=document.getElementById('lostItem').value;
    const quest=document.getElementById('quest').value;
    

    const auth=getAuth();
    const db=getFirestore();

    createLostForm(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            name: name,
            phoneNumber: phoneNumber,
            lostItem: lostItem
           
        };
        showMessage('Form Sumbitted', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='/TC4L-09-4/Frontend/User/home.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Form does not submitted!!!', 'signUpMessage');
        }
        else{
            showMessage('unable get form', 'signUpMessage');
        }
    })
 });