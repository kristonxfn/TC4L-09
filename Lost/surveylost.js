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
 const storage = getStorage(app); // Initialize Firebase Storage
 const database = getDatabase(app); // Initialize Firebase Realtime Database

 const surveyForm = document.getElementById('survey-form');

 surveyForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const role = document.getElementById('dropdown').value;
    const feedback = document.getElementById('feedback').value;
    const lostImage = document.getElementById('lost-image').files[0];
  
    const lostItemData = {
      name,
      phone,
      address,
      role,
      feedback,
    };
  
    // Get the current user's ID
    const userId = firebase.auth().currentUser.uid;
  
    // Create a storage reference for the image
    const storageRef = storage.ref('garage-form.appspot.com/files');


// Upload the image to Firebase Storage
storageRef.child(lostImage.name).put(lostImage)
.then((snapshot) => {
  console.log('Image uploaded successfully!');
  // Get the download URL for the uploaded image
  snapshot.ref.getDownloadURL()
    .then((downloadURL) => {
      lostItemData.image = downloadURL;

      // Create a new document in the "lost-surveys" collection
      const lostSurveysRef = firestore.collection('lost-surveys');
      lostSurveysRef.add(lostItemData)
        .then((docRef) => {
          console.log('Lost survey reported successfully!');
          // You can also display a success message on the webpage
          document.getElementById('title').innerText = 'Lost Survey Reported!';
          document.getElementById('description').innerText = 'Thank you for reporting the lost survey!';
        })
        .catch((error) => {
          console.error('Error reporting lost survey:', error);
          // You can also display an error message on the webpage
          document.getElementById('title').innerText = 'Error Reporting Lost Survey';
          document.getElementById('description').innerText = 'Please try again later.';
        });

      // Push the lost item data to the Realtime Database
      const ref = database.ref('lost-items');
      ref.push(lostItemData)
        .then(() => {
          console.log('Lost item reported successfully!');
          // You can also display a success message on the webpage
          document.getElementById('title').innerText = 'Lost Item Reported!';
          document.getElementById('description').innerText = 'Thank you for reporting the lost item!';
        })
        .catch((error) => {
          console.error('Error reporting lost item:', error);
          // You can also display an error message on the webpage
          document.getElementById('title').innerText = 'Error Reporting Lost Item';
          document.getElementById('description').innerText = 'Please try again later.';
        });
    })
    .catch((error) => {
      console.error('Error getting image download URL:', error);
    });
})
.catch((error) => {
  console.error('Error uploading image:', error);
});
});