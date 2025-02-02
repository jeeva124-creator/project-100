// Firebase App and Database imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getDatabase, ref, push, set, get } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFcYTP81HkpKz468_YVdZjbdpn7BSEzIc",
  authDomain: "movie-ticket-booking-a713e.firebaseapp.com",
  databaseURL: "https://movie-ticket-booking-a713e-default-rtdb.firebaseio.com",
  projectId: "movie-ticket-booking-a713e",
  storageBucket: "movie-ticket-booking-a713e.appspot.com",
  messagingSenderId: "791048807463",
  appId: "1:791048807463:web:bbb600b5a3a3b2e26eda02",
  measurementId: "G-ZK48NYGYDP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Dynamic movie and theater handling
let movieIndex = 0;
const movieContainer = document.querySelector("#movieContainer");
const addMovieButton = document.querySelector("#addMovieButton");

// Add new movie entry dynamically
addMovieButton.addEventListener("click", () => {
  movieIndex++;
  const newMovieEntry = document.createElement("div");
  newMovieEntry.classList.add("movie-entry");
  newMovieEntry.innerHTML = `
    <div class="form-group">
        <label for="movieName">Movie Name</label>
        <input type="text" class="form-control" name="movieName[]" required placeholder="Enter Movie Name">
    </div>
    <div id="theaterContainer-${movieIndex}" class="theater-container">
        <div class="theater-entry">
            <div class="form-group">
                <label for="theaterName">Theater Name</label>
                <input type="text" class="form-control" name="theaterName-${movieIndex}[]" required placeholder="Enter Theater Name">
            </div>
            <div class="form-group">
                <label for="time">Add New Times</label>
                <div id="timeFields-${movieIndex}">
                    <input type="time" class="form-control" name="time-${movieIndex}[]" required>
                </div>
                <button type="button" class="btn btn-secondary mt-2 addTimeBtn" data-theater-index="${movieIndex}">Add More Times</button>
            </div>
            <button type="button" class="btn btn-danger remove-theater">Remove Theater</button>
            <hr>
        </div>
    </div>
    <button type="button" class="btn btn-secondary addTheaterButton" data-movie-index="${movieIndex}">Add Another Theater</button>
    <hr>
  `;
  movieContainer.appendChild(newMovieEntry);
});

// Add another theater dynamically for a movie
movieContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("addTheaterButton")) {
    const movieIndex = e.target.getAttribute("data-movie-index");
    const theaterContainer = document.querySelector(`#theaterContainer-${movieIndex}`);
    const newTheaterEntry = document.createElement("div");
    newTheaterEntry.classList.add("theater-entry");
    newTheaterEntry.innerHTML = `
      <div class="form-group">
          <label for="theaterName">Theater Name</label>
          <input type="text" class="form-control" name="theaterName-${movieIndex}[]" required placeholder="Enter Theater Name">
      </div>
      <div class="form-group">
          <label for="time">Add New Times</label>
          <div id="timeFields-${movieIndex}">
              <input type="time" class="form-control" name="time-${movieIndex}[]" required>
          </div>
          <button type="button" class="btn btn-secondary mt-2 addTimeBtn" data-theater-index="${movieIndex}">Add More Times</button>
      </div>
      <button type="button" class="btn btn-danger remove-theater">Remove Theater</button>
      <hr>
    `;
    theaterContainer.appendChild(newTheaterEntry);
  }
});

// Add more time slots dynamically for a theater
// Add more time slots dynamically for a theater
movieContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("addTimeBtn")) {
    const theaterIndex = e.target.getAttribute("data-theater-index");
    
    // Identify the correct time field container by dynamically constructing its ID
    const timeFields = e.target.previousElementSibling;
    
    if (timeFields) {
      const newTimeInput = document.createElement("input");
      newTimeInput.type = "time";
      newTimeInput.className = "form-control mt-2";
      newTimeInput.name = `time-${theaterIndex}[]`;
      timeFields.appendChild(newTimeInput);
    } else {
      console.error(`Time container for theater index ${theaterIndex} not found.`);
    }
  }
});

// Remove a theater entry
movieContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-theater")) {
    e.target.parentElement.remove();
  }
});

// Submit form data
const form = document.querySelector("#addMovieForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const movies = formData.getAll("movieName[]");

  for (let i = 0; i < movies.length; i++) {
    const movieName = movies[i]; // Current movie name
    const theaterNames = formData.getAll(`theaterName-${i}[]`); // Theater names for the movie
    const times = formData.getAll(`time-${i}[]`); // Times corresponding to theaters
    // Reference to the movie node in Firebase
    const movieRef = ref(db, `theatre/${movieName}`);
    try {
      // Fetch current movie data
      const snapshot = await get(movieRef);
      for (let j = 0; j < theaterNames.length; j++) {
        const theaterName = theaterNames[j]; // Current theater name
        const theaterTimes = times.slice(j * theaterNames.length, (j + 1) * theaterNames.length); // Showtimes for this theater
        if (snapshot.exists()) {
          const theaters = snapshot.val(); // Existing theaters under this movie
          const theaterKey = Object.keys(theaters).find(
            (key) => theaters[key].theaterName === theaterName
          );
          if (theaterKey) {
            // Theater already exists, update its times
            const existingTimes = theaters[theaterKey].times || [];
            const updatedTimes = Array.from(new Set([...existingTimes, ...theaterTimes]));
            const theaterTimeRef = ref(db, `theatre/${movieName}/${theaterKey}/times`);
            await set(theaterTimeRef, updatedTimes);
          } else {
            // Add new theater with its times
            const newTheaterRef = push(movieRef);
            await set(newTheaterRef, { theaterName, times: theaterTimes });
          }
        } else {
          // No theaters exist under this movie, add the first one
          const newTheaterRef = push(movieRef);
          await set(newTheaterRef, { theaterName, times: theaterTimes });
        }
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }


  // Show success message
  document.querySelector(".alert").style.display = "block";
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Reset the form
  form.reset();
});
