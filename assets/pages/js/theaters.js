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
let selectedDate=localStorage.getItem("selectDate")

console.log(urlParams);
console.log(selectedShowId);
console.log(movieName);


const movieNameElement = document.querySelector(".movieName");

// Fetch movie details from Firebase
// async function fetchMovieDetails() {
//   try {
//     const movieRef = ref(db, `/movies/${selectedShowId}`);
//     const snapshot = await get(movieRef);
//      console.log(movieRef);

//     if (snapshot.exists()) {
//       const movieData = snapshot.val();
//       movieNameElement.innerHTML = `
//         <img src="${movieData.movieImg}" alt="${movieData.title}" />
//         <div>
//         <h1>${movieData.title}</h1>
//         <p>${movieData.Languages}</p>
//         </div>
//       `;

//       localStorage.setItem("movieimg", movieData.movieImg);
//       localStorage.setItem("title", JSON.stringify(movieData.title));
//     } else {
//       console.log("No movie found with the given ID.");
//     }
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//   }
// }


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
    dateArr.push(getFormattedDate(i));
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
      selectedDate=element.textContent
      showDetails()
      document.querySelectorAll(".showTimings").forEach(el => el.style.display = "flex");
    });
  });

}

async function showDetails() {

  try {

    const response = await fetch(`http://localhost:8080/api/shows/${selectedShowId}`);


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const show = await response.json();
    console.log(show);

    const movie = show.movie;
    movieNameElement.innerHTML = `
        <img src="${movie.imgUrl}" alt="${movie.movieName}" />
        <div>
          <h1>${movie.movieName}</h1>
          <p>${movie.genre}</p>
        </div>
      `;
      localStorage.setItem("movieimg",movie.imgUrl)
      localStorage.setItem("title",movie.movieName)
      

    let tittle = document.querySelector(".title")

    tittle.textContent = movie.movieName


    const container = document.querySelector("#theatresContainer");
    container.innerHTML = "";


    const theater = show.theater;
    const time = show.showTime;

    let Showtime = await fetch("http://localhost:8080/api/shows")

    let times = await Showtime.json()
    console.log(times);


    const div = document.createElement("div");
    div.classList.add("showdiv");
    const date = new Date();

    const day = date.getDate();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

    let todayDate=getFormattedDate(0)
    const isTodaySelected = selectedDate === todayDate;

    const formatted = `${day} ${weekday}`;
    console.log(formatted);

    div.innerHTML = `
    
    <a class="theaterName">${theater.name}</a>

    <div class="timeContainer">
    
     ${
  times.showTimings
    .map((time) => {
      const now = new Date();
      const showTime = new Date(now); 

      const [timePart, meridian] = time.trim().split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);


      if (meridian === "PM" && hours < 12) hours += 12;
      if (meridian === "AM" && hours === 12) hours = 0;

      showTime.setHours(hours, minutes, 0, 0);

      // If selected date is today, show only future times
      if (isTodaySelected) {
        if (showTime > now) {
          return `<button class="showTimeBtn">${time}</button>`;
        }
        return "";
      } else {
      
        return `<button class="showTimeBtn">${time}</button>`;
      }

    })

    .join("")
}

    

    </div>
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

    container.appendChild(div);

    document.querySelectorAll(".showTimeBtn").forEach((showBtn) => {
      showBtn.addEventListener("click", (e) => {


        localStorage.setItem("showtime", e.target.textContent);
        let login = localStorage.getItem("loggedInAccount");

        if (!login) {
          alert("Please log in first");
          window.location.href = "/login.html";
          return;
        }
        if (document.querySelector(".dateActive")) {
          localStorage.setItem("theater",theater.name)
          window.location.href = "Seat.html";
        } else {
          alert("Please select a date first");
        }
      })
    })


  } catch (error) {
    console.error("Error fetching movie:", error);
  }
}


function getFormattedDate(dayCount) {
   const options = { weekday: "short", day: "numeric" };
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + dayCount);
    return new Intl.DateTimeFormat("en-US", options).format(newDate);
}



document.addEventListener("DOMContentLoaded",()=>{
selectedDate=getFormattedDate(0)
getDates();
showDetails();
document.querySelector(".dateItems").classList.add("dateActive")
})