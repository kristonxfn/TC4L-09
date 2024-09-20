// Import Firebase services using the modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBK4x087mtwGGUj7AsrNs0xzJsrhu2OoVQ",
    authDomain: "garage-form.firebaseapp.com",
    projectId: "garage-form",
    storageBucket: "garage-form.appspot.com",
    messagingSenderId: "557862900022",
    appId: "1:557862900022:web:6efd51cf1d2ff8ebf62397"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to create a 'Lost' collection inside the user's UID
async function createLostCollectionForUser(data) {
    try {
      const user = auth.currentUser;
  
      if (user) {
        // Reference to the 'Lost' collection inside the user's UID
        const lostCollectionRef = collection(db, 'users', user.uid, 'Lost');
  
        // Add a new document to the 'Lost' collection with the provided data
        await addDoc(lostCollectionRef, {
          ...data,
          timestamp: serverTimestamp() // Capture time of submission
        });
  
        console.log(`New document added to 'Lost' collection for user: ${user.uid}`);
      } else {
        console.log('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error adding document to Lost collection:', error);
    }
  }
  
  // Check if the user is authenticated on page load
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, show the form
      const lostForm = document.getElementById('lostForm');
      
      lostForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const itemName = document.getElementById('itemName').value;
        const itemDescription = document.getElementById('itemDescription').value;
        const contactInfo = document.getElementById('contactInfo').value;
  
        const data = {
          itemName,
          itemDescription,
          contactInfo
        };
  
        // Call the function to save the lost item in the 'Lost' collection
        createLostCollectionForUser(data)
          .then(() => {
            alert('Lost item reported successfully!');
            window.location.href = 'losthome.html'; // Redirect after success
          })
          .catch((error) => {
            alert('Failed to report lost item.');
          });
      });
    } else {
      // User is not signed in, redirect to login page
      window.location.href = '/TC4L-09/Frontend/Backend/index.html';
    }
  });