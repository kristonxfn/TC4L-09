import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, Timestamp, addDoc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBK4x087mtwGGUj7AsrNs0xzJsrhu2OoVQ",
    authDomain: "garage-form.firebaseapp.com",
    projectId: "garage-form",
    storageBucket: "garage-form.appspot.com",
    messagingSenderId: "557862900022",
    appId: "1:557862900022:web:6efd51cf1d2ff8ebf62397"
  };
  
  
/*
stabalise a connection between ur frontend (index.js) with ur backend (firebase dashboard), 
using "intializeApp()" provided by the CDN
*/
const app = initializeApp(firebaseConfig);

/*
    now we have a connection between frontend and backend --> "app", WE
    will use our database in our frontend using "getFirestore" by the CDN
*/
const db = getFirestore(app);

const ul = document.querySelector("ul");

const addTesting = (testing, id) => {
  // create a <li> template to be inserted into the <ul>
  // 1 document = 1 <li>

  let html = `
    <li data-id=${id}>
      <div>${testing.title}</div>
      <div>${testing.createdAt.toDate()}</div>
      <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm my-2">Delete</button>
    </li>
  `;

  ul.innerHTML += html;
};

// Part 1.1 - get documents of "testing" collection

const fetchTestings = async () => {
  // get the 'testing collection
  const testingsCollection = collection(db, "testing");
  
  // get the documents inside this 'testing' collection
  const snapshot = await getDocs(testingsCollection);
  
  
  //snapshot - picture of your database
  snapshot.forEach((doc) => {
    console.log(doc.data());
    console.log(doc.id);
    console.log('----------')
    addTesting(doc.data(), doc.id)
  });
  
};
  
fetchTestings();
  
//-------------------------------------------------
//Part 1.2 - add document

const form = document.querySelector("form")

form.addEventListener("submit", async (event)=>{
  event.preventDefault()//prevent refreshing the page


  //(i) extract data from <form>
  const input = form.testing.value.trim()

  //(ii) create a data object

  const now = new Date()

  //(iii)construct an object to be posted to the database

  const testing = {
    title : input,
    createdAt: Timestamp.fromDate(now)
  }

  console.log(testing)

  form.reset()

  //(iv) post this testing object into to the firestore

  //question: does posting data in db always successful --> no
  //solution: try/catch

  try{
    const testingsCollection = collection(db, "testing")
    const docRef = await addDoc(testingsCollection, testing)
    console.log(`Document written with ID: ${docRef.id}`)

  } catch(error){
    console.error(`Error adding testing to database: ${error.message}`)
  }

})