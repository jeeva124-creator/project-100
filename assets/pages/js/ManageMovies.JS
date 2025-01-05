import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFcYTP81HkpKz468_YVdZjbdpn7BSEzIc",
  authDomain: "movie-ticket-booking-a713e.firebaseapp.com",
  databaseURL: "https://movie-ticket-booking-a713e-default-rtdb.firebaseio.com",
  projectId: "movie-ticket-booking-a713e",
  storageBucket: "movie-ticket-booking-a713e.firebasestorage.app",
  messagingSenderId: "791048807463",
  appId: "1:791048807463:web:bbb600b5a3a3b2e26eda02",
  measurementId: "G-ZK48NYGYDP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const usersRef = ref(db, "/movies");
const head = document.querySelector(".movies-flux");


onValue(usersRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log(data);

    
    head.innerHTML = "";

    data.forEach((show, index) => {
      if (index === 0) return; 

      const div = document.createElement("div");
      div.classList.add("movie-container");
      div.innerHTML = `
        <img src="${show["movieImg"]}" alt="${show.title}">
        <h3>${show.title}</h3> 
        <p>${show.category}</p> 
        <button class="delete" data-id="${index}">
          Delete
        </button>
      `;
      head.append(div);
    });

    // Attach event listeners to buttons after rendering
    const buttons = document.querySelectorAll(".delete");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const movieId = e.target.dataset.id;
        console.log(`Delete button clicked for movie ID: ${movieId}`);

        // Remove the movie from the database
        const movieRef = ref(db, `/movies/${movieId}`);
        remove(movieRef)
          .then(() => {
            console.log("Data deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      });
    });
  }
});
