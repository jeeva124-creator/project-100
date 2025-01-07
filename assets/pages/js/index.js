
//   <!-- Firebase App -->

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
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

const searchBar = document.querySelector(".search-input");
const head = document.querySelector(".movies-flux");

let movies = [];

// function to view to list of movies

onValue(usersRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log(data);

    movies = data.map((show, index) => {
      if (index == 0) {
        return;
      }
      const div = document.createElement("div");
      div.classList.add("movie-container");
      console.log(show)
      div.innerHTML = `
          <img src="${show["movieImg"]}" alt="${show.title}">
          <h3>${show.title}</h3> 
          <p>${show.category}</p>
          <a href="./../../../movie_details.html?movieId=${index}" class="bookTicketButton">Book Ticket</a>`;

      head.append(div);
      return {
        name: show.title.toLowerCase(),
        img: show.img,
        category: show.category,
        element: div,
      };
    });

  }
});
// function for the search functionality

searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  let isAnyMovieVisible = false;

  movies.forEach((movie) => {
    const isVisible = movie.name.toLowerCase().includes(value);
    movie.element.style.display = isVisible ? "block" : "none";
    document.getElementById("carouselExample").style.display="none";
    if (searchBar==""){
      window.location.reload
      document.getElementById("carouselExample").style.display="black";
    }
    if (isVisible) {
      isAnyMovieVisible = true;
    }
    else{
      
    }
  });
});
