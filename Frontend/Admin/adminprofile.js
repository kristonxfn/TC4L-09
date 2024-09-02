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

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "admin", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUser').innerText=userData.admin;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedAdminName').innerText=userData.name;
            } else {
                console.log("No document found matching ID");
                // You can also display an error message on the webpage
                document.getElementById('loggedUser').innerText="nishantadmin";
                document.getElementById('loggedUserEmail').innerText="kristondiscord@gmail.com";
                document.getElementById('loggedAdminName').innerText="Nishant";
            }
        })
        .catch((error)=>{
            console.log("Error getting document", error);
            // You can also display an error message on the webpage
            document.getElementById('loggedUser').innerText="Error loading admin data";
            document.getElementById('loggedUserEmail').innerText="";
            document.getElementById('loggedAdminName').innerText="";
        })
    } else {
        console.log("User ID not found in local storage");
        // You can also display an error message on the webpage
        document.getElementById('loggedUser').innerText="Admin not logged in";
        document.getElementById('loggedUserEmail').innerText="";
        document.getElementById('loggedAdminName').innerText="";
    }
})

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click',()=>{
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
  .then(()=>{
      window.location.href='/TC4L-09/Backend/index.html';
  })
  .catch((error)=>{
      console.error('Error Signing out:', error);
  })
})

const homeButton=document.getElementById('home');

homeButton.addEventListener('click', () => {
  try {
    // Add some logic here if needed
    window.location.href = '/TC4L-09/Frontend/Admin/adminhome.html';
  } catch (error) {
    console.error('Error redirecting to home page:', error);
  }
});