// Firebase App and Database imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFcYTP81HkpKz468_YVdZjbdpn7BSEzIc",
  authDomain: "movie-ticket-booking-a713e.firebaseapp.com",
  databaseURL: "https://movie-ticket-booking-a713e-default-rtdb.firebaseio.com",
  projectId: "movie-ticket-booking-a713e",
  storageBucket: "movie-ticket-booking-a713e.firebasestorage.app",
  messagingSenderId: "791048807463",
  appId: "1:791048807463:web:bbb600b5a3a3b2e26eda02",
  measurementId: "G-ZK48NYGYDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Selecting the form
const form = document.querySelector("#addMovieForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();  

    const data = new FormData(form);
    console.log(data);

    // Convert FormData to an object
    const obj = Object.fromEntries(data);
    console.log(obj);

    set(ref(db, 'movies/' + obj.movieId), obj)  
        .then(() => {
            console.log("Movie saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving movie:", error);
        });
        document.querySelector(".alert").style.display="block"
  setTimeout(()=>{
            document.querySelector(".alert").style.display="none"
  },3000)
        document.getElementById("addMovieForm").reset();
});


