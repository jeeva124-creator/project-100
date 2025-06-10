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

// Fetch movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedMovieId = urlParams.get("movieId");

// const usersRef = ref(db, `movies/${selectedShowId}`);
const usersRef = ref(db, `movies/${selectedMovieId}`);



// function setMovieDetails() {
//   onValue(usersRef, (snapshot) => {
//     if (snapshot.exists()) {
//       const movieDetails = snapshot.val();
//       console.log(movieDetails);

//       // Fetch rating from OMDB API and then update the UI
//       fetchMovieRating(movieDetails.title).then((movieRating) => {
//         document.body.innerHTML = `
//           <section class="movieDetails">
//             <header>
//               <div class="title">
//                 <h1>${movieDetails.title}</h1>
//                 <p>${movieDetails.RunTime} / ${movieDetails.category}</p>
//               </div>
//               <a href="../../../theaters.html?id=${movieDetails.movieId}&moviename=${movieDetails.title}">
//                 <button type="button" class="View-All-shows">View All shows</button>
//               </a>
//             </header>

//             <section>
//               <div class="movie_trailer">
//                 <iframe src="${movieDetails.Trailer}"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//               </div>
//             </section>

//             <section class="minfo-container">
//               <div>
//                 <div class="info-row">
//                   <label>Director:</label>
//                   <p class="value">${movieDetails.Director}</p>
//                 </div>
//                 <div class="info-row">
//                   <label>Rating:</label>
//                   <p class="value">${movieRating}</p> <!-- Rating dynamically set -->
//                 </div>
//                 <div class="info-row">
//                   <label>Languages:</label>
//                   <p class="value">${movieDetails.Languages}</p>
//                 </div>
//                 <div class="info-row">
//                   <label>Release Date:</label>
//                   <p class="value">${movieDetails.ReleaseDate}</p>
//                 </div>
//                 <div class="info-row">
//                   <label>Run Time:</label>
//                   <p class="value">${movieDetails.RunTime}</p>
//                 </div>
//               </div>
//             </section>
//             <hr class="hr">
//             <section>
//               <div class="Synopsis">
//                 <h2>Synopsis</h2>
//                 <p>${movieDetails.Synopsis}</p>
//               </div>
//             </section>
//             <section class="topcast">
//               <div class="top-cast">
//                 <h2 class="TopCast">Top Cast</h2>
//                 <div class="leadimg">
//                   <div class="actor">
//                     <img src="${movieDetails["lead-img"]}" alt="${movieDetails.title}">
//                     <h2 class="actor-name">${movieDetails["TopCast-lead"]}</h2>
//                   </div>
//                   <div class="actor">
//                     <img src="${movieDetails["sub-img"]}" alt="${movieDetails["sub-name"]}">
//                     <h2 class="actor-name">${movieDetails["sub-name"]}</h2>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           `;

//           let title=document.querySelector(".title");
//           title.textContent=movieDetails.title
//         // Add click event to actor names
//         document.querySelectorAll(".actor-name").forEach((actor) => {
//           actor.addEventListener("click", () => {
//             const query = actor.innerText.split(" ").join("+");
//             window.open(`https://www.google.com/search?q=${query}`, "_blank");
//           });
//         });
//       });
//     } else {
//       console.error((window.location.href = "../../../error.html"));
//     }
//   });
// }

// setMovieDetails();



async function fetchMovieById(selectedMovieId) {
console.log(selectedMovieId);


  try {
      const response = await fetch(`http://localhost:8080/movies/${selectedMovieId}`);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const movie = await response.json();
      
      console.log("Movie Details:", movie); 
      console.log(movie);
      renderMovieDetails(movie); 
      
      // Ensure you have a function to handle single movie rendering
  } catch (error) {
      console.error("Error fetching movie:", error);
  }
}



// Run the function

function renderMovieDetails(movieDetails){

  document.body.innerHTML = `
  <section class="movieDetails">
    <header>
      <div class="title">
        <h1>${movieDetails.movieName}</h1>
        <p>${movieDetails.duration} / ${movieDetails.genre}</p>
      </div>
      <a href="../../../theaters.html?id=${movieDetails.id}&moviename=${movieDetails.movieName}">
        <button type="button" class="View-All-shows">View All shows</button>
      </a>
    </header>

    <section>
      <div class="movie_trailer">
        <iframe src="${movieDetails.trailerUrl}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </section>

    <section class="minfo-container">
      <div>
        <div class="info-row">
          <label>Director:</label>
          <p class="value">${movieDetails.director}</p>
        </div>
        <div class="info-row">
          <label>Rating:</label>
          <p class="value">${movieDetails.rating}</p> <!-- Rating dynamically set -->
        </div>
        <div class="info-row">
          <label>Release Date:</label>
          <p class="value">${movieDetails.releaseDate}</p>
        </div>
        <div class="info-row">
          <label>Run Time:</label>
          <p class="value">${movieDetails.duration}</p>
        </div>
      </div>
    </section>
    <hr class="hr">
    <section>
      <div class="Synopsis">
        <h2>Synopsis</h2>
        <p>${movieDetails.description}</p>
      </div>
    </section>
    <section class="topcast">
      <div class="top-cast">
        <h2 class="TopCast">Top Cast</h2>
        <div class="leadimg">
          <div class="actor">
            <img src="${movieDetails["lead-img"]}" alt="${movieDetails.name}">
            <h2 class="actor-name">${movieDetails["TopCast-lead"]}</h2>
          </div>
          <div class="actor">
            <img src="${movieDetails["sub-img"]}" alt="${movieDetails["sub-name"]}">
            <h2 class="actor-name">${movieDetails["sub-name"]}</h2>
          </div>
        </div>
      </div>
    </section>
  `;

  
  let title=document.querySelector(".title");
  title.textContent=movieDetails.movieName



}

fetchMovieById(selectedMovieId);