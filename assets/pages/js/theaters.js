import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
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

// Fetch URL parameters
const urlParams = new URLSearchParams(window.location.search);
const selectedShowId = urlParams.get("id");
const movieName = urlParams.get("moviename");

const movieNameElement = document.querySelector(".movieName");

// Fetch movie details from Firebase
async function fetchMovieDetails() {
  try {
    const movieRef = ref(db, `/movies/${selectedShowId}`);
    const snapshot = await get(movieRef);

    if (snapshot.exists()) {
      const movieData = snapshot.val();
      movieNameElement.innerHTML = `
        <img src="${movieData.movieImg}" alt="${movieData.title}" />
        <div>
        <h1>${movieData.title}</h1>
        <p>${movieData.Languages}</p>
        </div>
      `;

      localStorage.setItem("movieimg", movieData.movieImg);
      localStorage.setItem("title", JSON.stringify(movieData.title));
    } else {
      console.log("No movie found with the given ID.");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

// Render available dates for the next 7 days
function renderDate(dates) {
  const container = document.querySelector("#dateContainer");
  container.innerHTML = ""; // Clear existing dates
  const fragment = document.createDocumentFragment();

  dates.forEach(date => {
    const dateDiv = document.createElement("div");
    dateDiv.textContent = date;
    dateDiv.classList.add("dateItems");
    fragment.appendChild(dateDiv);
  });

  container.appendChild(fragment);
  attachDateListeners();
}

function getDates() {
  const dateArr = [];
  const options = { weekday: "short", day: "numeric" };

  for (let i = 0; i < 7; i++) {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + i);
    dateArr.push(new Intl.DateTimeFormat("en-US", options).format(newDate));
  }

  renderDate(dateArr);
}

function attachDateListeners() {
  document.querySelectorAll(".dateItems").forEach(element => {
    element.addEventListener("click", () => {
      const activeElement = document.querySelector(".dateActive");
      if (activeElement) activeElement.classList.remove("dateActive");

      element.classList.add("dateActive");
      localStorage.setItem("selectDate", element.textContent);
      document.querySelectorAll(".showTimings").forEach(el => el.style.display = "flex");
    });
  });
}

// Fetch and display theater details
async function fetchTheaterDetails() {
  try {
    const theatreRef = ref(db, `theatre/${movieName}`);
    const snapshot = await get(theatreRef);
    const container = document.querySelector("#theatresContainer");
    container.innerHTML = ""; // Clear previous content

    if (snapshot.exists()) {
      const theatreData = snapshot.val();

      for (const theatreKey in theatreData) {
        const theatreInfo = theatreData[theatreKey];
        const div = document.createElement("div");
        div.classList.add("showdiv");

        div.innerHTML = `
          <a class="theaterName">${theatreInfo.theaterName}</a>
          <div class="timeContainer"></div>
          <div class="service">
            <div class="mobil">
              <img src="/assets/image/check.png" alt="M-Ticket">
              <label>M-Ticket</label>
            </div>
            <div class="food">
              <img src="/assets/image/food (1).png" alt="Food">
              <label>Food & Beverage</label>
            </div>
          </div>
        `;

        const timeContainer = div.querySelector(".timeContainer");

        theatreInfo.times.forEach(time => {
          const timeElement = document.createElement("p");
          timeElement.textContent = time;
          timeElement.classList.add("time");
          timeContainer.appendChild(timeElement);

          timeElement.addEventListener("click", () => {
            const theaterName = theatreInfo.theaterName.trim();
            localStorage.setItem("theaterName", theaterName);
            localStorage.setItem("movieTime", time);

            if (document.querySelector(".dateActive")) {
              window.location.href = "Seat.html";
            } else {
              alert("Please select a date first");
            }
          });
        });

        container.appendChild(div);
      }
    } else {
      console.log("No theater data found.");
    }
  } catch (error) {
    console.error("Error fetching theater details:", error);
  }
}


// Initialize functions
fetchMovieDetails();
getDates();
fetchTheaterDetails();