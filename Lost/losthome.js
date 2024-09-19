// Import the required Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBK4x087mtwGGUj7AsrNs0xzJsrhu2OoVQ",
    authDomain: "garage-form.firebaseapp.com",
    databaseURL: "https://garage-form-default-rtdb.firebaseio.com", // Ensure this matches your database URL
    projectId: "garage-form",
    storageBucket: "garage-form.appspot.com",
    messagingSenderId: "557862900022",
    appId: "1:557862900022:web:6efd51cf1d2ff8ebf62397"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Function to display lost items
function displayLostItems() {
    const lostItemsContainer = document.getElementById('lostItemsContainer');
    const lostItemsRef = ref(db, 'lostItems'); // Reference to the lost items in the database

    onValue(lostItemsRef, (snapshot) => {
        lostItemsContainer.innerHTML = ''; // Clear previous items

        // Check if there are any lost items
        if (!snapshot.exists()) {
            lostItemsContainer.innerHTML = '<p>No lost items reported.</p>';
            return;
        }

        snapshot.forEach(userSnapshot => {
            // Loop through each user's lost items
            userSnapshot.forEach(itemSnapshot => {
                const lostItem = itemSnapshot.val(); // Get item data
                const itemDiv = document.createElement('div');
                itemDiv.className = 'lost-item';

                // Add item details to the div
                itemDiv.innerHTML = `
                    <h3>${lostItem.itemName}</h3>
                    <p>Description: ${lostItem.itemDescription}</p>
                    <p>Contact Info: ${lostItem.contactInfo}</p>
                    <p>Reported By: ${userSnapshot.key}</p> <!-- Displaying user ID as the reporter -->
                `;

                lostItemsContainer.appendChild(itemDiv); // Append item to container
            });
        });
    }, (error) => {
        console.error('Error fetching data:', error); // Log any errors
        lostItemsContainer.innerHTML = '<p>Error loading lost items.</p>';
    });
}

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayLostItems(); // Fetch and display lost items if user is logged in
    } else {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
});

console.log('Data snapshot:', snapshot.val());
