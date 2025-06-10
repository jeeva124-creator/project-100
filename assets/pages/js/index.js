
//   <!-- Firebase App -->

import { getAuth, onAuthStateChanged, signOut ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
}
 from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
const auth = getAuth();

const usersRef = ref(db, "/movies");

// let recipientMail = localStorage.getItem("loggedInAccount");
// console.log(recipientMail);


// const searchBar = document.querySelector(".search-input");
const head = document.querySelector(".movies-flux");

let movies = [];

let offcanvasSidebar; 
let loginButton=document.getElementById("loginButton")
offcanvasSidebar = document.querySelector("#offcanvasRight");
onAuthStateChanged(auth, (user) => {
   if (user) {
     updateUI(user);
   } else {
     updateUI(null);
   }
 });
  let profile=document.querySelector(".user-actions")

  // Function to update UI based on user state
function updateUI(user) {
  if (user) {
    let email=user.email
    
    console.log(email)
    const sanitizedEmail = email.replace('.', ',');
    const emailRef = ref(db, `/users/${sanitizedEmail}`);
    onValue(emailRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
      
      }
    });
       
    if (loginButton) {
      loginButton.style.display = "none";
      profile.style.display = "block";

    }

    if (offcanvasSidebar) {
      const bootstrapOffcanvas = new bootstrap.Offcanvas(offcanvasSidebar);
      bootstrapOffcanvas.show();
    }
  } else {
    
    if (loginButton) {
      loginButton.style.display = "block";
      profile.style.display = "none";


    }
  }
}


async function fetchMovies() {
  try {

      const response = await fetch("http://localhost:8080/movies")
    console.log(response);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const movies = await response.json();
      renderMovies(movies);
  } catch (error) {
      console.error("Error fetching movies:", error);
  }
}


function renderMovies(movies) {

  movies.forEach((movie, index) => {
    if (index ==0) {
          return;
            }
    const div = document.createElement("div");
    console.log(div);
    
    div.classList.add("movie-container");
    div.innerHTML = `
        <img src="${movie.imgUrl}" alt="${movie.movie_name}">
        <h3>${movie.movieName}</h3> 
        <p>${movie.genre}</p>
        <a href="./../../../movie_details.html?movieId=${movie.id}" class="bookTicketButton">Book Ticket</a>
        <p id="error"></p>`;

    head.append(div);
  });
}
let  searchBar = document.querySelector(".search-input");

// searchBar.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   const error = document.querySelector('.error');
//   const movieContainer = document.getElementById("movieContainer"); // Make sure your movie list has this ID
//   const carousel = document.getElementById("carouselExample");
//   const footer = document.querySelector(".footer");

//   if (value === "") {
//     carousel.style.display = "block";
//     movieContainer.innerHTML = "";
//     if (error) error.style.display = "none";
//     return;
//   }

//   carousel.style.display = "none";
//    let url=`http://localhost:8080/movies/search?query=${value}`;
//    console.log(url);
   
//   fetch(url)
//     .then(res => res.json())
//     .then(movies => {
//       movieContainer.innerHTML = "";

//       if (movies.length === 0) {
//         if (!error) {
//           const errorElement = document.createElement('div');
//           errorElement.classList.add('error');
//           errorElement.innerHTML = "Movie not found";
//           document.body.appendChild(errorElement);
//           footer.style.display = "none";
//         } 
//         else {
//           error.style.display = "block";
//         }
//       }
//        else {
//         if (error) error.style.display = "none";
//         footer.style.display = "block";

//         // Render each movie
//         movies.forEach(movie => {
//           const movieDiv = document.createElement('div');
//           movieDiv.classList.add("movie-card"); // Or your specific card class
//           movieDiv.innerHTML = `
//             <img src="${movie.imgUrl}" alt="${movie.movieName}" />
//             <h3>${movie.movieName}</h3>
//             <p>${movie.genre}</p>
//             <p>Rating: ${movie.rating}</p>
//           `;
//           movieContainer.appendChild(movieDiv);
//         });
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching movies:", error);
//     });
// });


// Profile page view

searchBar.addEventListener("input", async (e) => {
  const query = e.target.value.trim().toLowerCase();  
  
  const carousel = document.getElementById("carouselExample");
  if (searchBar==""){
     window.location.reload()
  }

  let error = document.querySelector(".error");

  if (!query) {  
    carousel.style.display = "block";
    movieContainer.innerHTML = "";  
    if (error) error.style.display = "none";  // Hide error message
    return;
  }

  carousel.style.display = "none";  // Hide carousel during search


  try {

    const response = await fetch(`http://localhost:8080/movies/search?query=${query}`);
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    
    const responseText = await response.text(); 
    console.log("Response Text:", responseText);  


    if (!responseText) {
      throw new Error("Empty response from server");
    }


    // Now try to parse it as JSON
    let movies = [];
    try {

      movies = JSON.parse(responseText);  // Parse the JSON manually
    } 
    
    catch (e) {
      console.error("Error parsing JSON:", e);
      return;
    }

    console.log("Movies data:", movies);

   

    // Clear the movie container before rendering new results
    head.innerHTML = "";

    if (movies.length === 0) {
      // Display error message if no movies found
      if (!error) {
        error = document.createElement("div");
        error.className = "error";
        error.textContent = "No movies found";
        document.body.appendChild(error);
      } else {
        error.style.display = "block";
      }
      return;
    }
    if (error) error.style.display = "none";

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.imgUrl}" alt="${movie.movieName}" />
        <h3>${movie.movieName}</h3>
        <p>${movie.genre}</p>
        <a href="./../../../movie_details.html?movieId=${movie.id}" class="bookTicketButton">Book Ticket</a>
        <p>Rating: ${movie.rating}</p>
      `;
      head.appendChild(card);
    });

  }
   
  catch (err) {
    console.error("Failed to fetch movies:", err);
    if (!error) {
      error = document.createElement("div");
      error.className = "error";
      // error.textContent = "An error occurred while fetching movies.";
      document.body.appendChild(error);
    } else {
      error.style.display = "block";
    }
  }
});


let profileIcon = document.querySelector(".user-actions");

profileIcon.addEventListener("click", () => {
  console.log("click");
  window.location.href = "..../../../../../profile.html";
});

document.addEventListener("DOMContentLoaded", fetchMovies);  // Fetch movies on initial page load
