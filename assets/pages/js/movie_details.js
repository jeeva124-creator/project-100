import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
// Firebase configuration

// const imdb='57483675';

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
// Reference to a specific path in the database (e.g., 'users')
let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString); // class
const selectedShowId = urlParams.get("movieId");
const usersRef = ref(db, `movies/${selectedShowId}`);

setMovieDetails();
async function setMovieDetails() {
  let movieDetails;

  // Fetch movie data from Firebase
  onValue(usersRef, async (snapshot) => {
    if (selectedShowId == selectedShowId) {
      if (snapshot.exists()) {
        movieDetails = snapshot.val();
        console.log(movieDetails);

        // Fetch rating from OMDB API
        const omdbApiKey = "9983891e";
        const omdbUrl = `https://www.omdbapi.com/?t={movieDetails.title&apikey=${omdbApiKey}`;
        let movieRating = "N/A"; // Default value if rating is not found

        try {
          const response = await fetch(omdbUrl);
          const omdbData = await response.json();
          if (omdbData.Response === "True" && omdbData.imdbRating) {
            movieRating = omdbData.imdbRating;
          }
        } catch (error) {
          console.error("Error fetching data from OMDB:", error);
        }

        // Render the movie details to the page
        document.body.innerHTML = `
          <section class="movieDetails">
            <header>
              <div class="title">
                <h1>${movieDetails.title}</h1>
                <p>${movieDetails.RunTime} / ${movieDetails.category}</p>
              </div>
              <a href="../../../theaters.html?id=${movieDetails.movieId}&moviename=${movieDetails.title}">
                <button type="button" class="View-All-shows">View All shows</button>
              </a>
            </header>
  
            <section>
              <div class="movie_trailer">
                <iframe src="${movieDetails.Trailer}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </section>
  
            <section class="minfo-container">
              <div>
                <div class="info-row">
                  <label>Director:</label>
                  <p class="value">${movieDetails.Director}</p>
                </div>
                <div class="info-row">
                  <label>Rating:</label>
                  <p class="value">${movieRating}</p>
                </div>
                <div class="info-row">
                  <label>Languages:</label>
                  <p class="value">${movieDetails.Languages}</p>
                </div>
                <div class="info-row">
                  <label>Release Date:</label>
                  <p class="value">${movieDetails.ReleaseDate}</p>
                </div>
                <div class="info-row">
                  <label>Run Time:</label>
                  <p class="value">${movieDetails.RunTime}</p>
                </div>
              </div>
            </section>
            <hr class="hr">
            <section>
              <div class="Synopsis">
                <h2>Synopsis</h2>
                <p>${movieDetails.Sunopsis
                }</p>
              </div>
            </section>
            <section class="topcast">
              <div class="top-cast">
                <h2 class="TopCast">Top Cast</h2>
                <div class="leadimg">
                  <div class="actor">
                    <img src="${movieDetails["lead-img"]}" alt="${movieDetails.title}">
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

        // Add click event to actor names
        const actors = document.getElementsByClassName("actor-name");
        const actorsArray = Array.from(actors);
        actorsArray.forEach((actor) => {
          actor.addEventListener("click", () => {
            const query = actor.innerText.split(" ").join("+");
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
          });
        });
      } else {
        console.error((window.location.href = "../../../error.html"));
      }
    }
  });
}
