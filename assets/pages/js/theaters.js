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

const usersRef = ref(db, "/movies");

// Get URL parameters
const queryString = window.location.search;
console.log("url is :" + queryString);

const urlParams = new URLSearchParams(queryString);
const selectedShowId = urlParams.get("id");

console.log("id : " + selectedShowId);

const movieName = urlParams.get("moviename");
console.log("movieName :" + movieName);

const moviename = document.querySelector(".movieName");

// Fetch movie data from Firebase
async function fetchMovieDetails() {
  const movieRef = ref(db, `/movies/${selectedShowId}`);
  const snapshot = await get(movieRef);

  if (snapshot.exists()) {
    const movieData = snapshot.val();
    console.log("Movie Data:", movieData);
    // Update movie details in the DOM
    moviename.innerHTML = `
     <img src="${movieData.movieImg}" alt="${movieData.title}" />
      <h1>${movieData.title}</h1>
      <p> ${movieData.Languages}</p>
     
    `;
  } else {
    console.log("No movie found with the given ID.");
  }
}

fetchMovieDetails();

// Other functions like `movieshow` can remain as they are or be further adjusted based on your logic.




const theatersContainer = document.querySelector(".theaters");
const head = document.querySelector(".show-theaters");
const dateselection = document.querySelector(".date-selection");

// Fetch theater data
fetch("/assets/data/theatre.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    
    data.forEach((theater) => {
      const div = document.createElement("div");
      div.classList.add("theater");
      div.innerHTML = `
        <img src="${theater.img}" alt="${theater.theatername}">
        <h2>${theater.theatername}</h2>
        <div class= "showTimings">
         <a href="../../../Seat.html?id=${
          theater.id}&theatername=${encodeURIComponent(theater.theatername)}&showTiming=04">04:00 pm</a>
          <a href="../../../Seat.html?id=${
          theater.id}&theatername=${encodeURIComponent(theater.theatername)}&showTiming=07">07:00 pm</a>
        </div>
      `;

      head.append(div);
    });
  })
  
 function getDates(){

  let dateArr = [];

  for(let i = 0; i < 7; i++){
    let newDate = new Date();
    newDate.setDate(newDate.getDate()+i);
    
    let options={ weekday: 'short', day: 'numeric' };
  let formatDate = new Intl.DateTimeFormat('en-US', options).format(newDate)
  dateArr.push(formatDate)
  }

  renderDate(dateArr);

  
 }

 function renderDate(arr){
  let newContainer = document.createDocumentFragment();

  for(let date of arr){
    let createDiv = document.createElement("div");
  createDiv.textContent = date;
  createDiv.classList.add("dateItems")
  
  newContainer.appendChild(createDiv);

  }
  document.querySelector("#dateContainer").append(newContainer)
 }
 
 getDates()

// listerer for dateActive

document.querySelectorAll(".dateItems").forEach((element)=>{
  element.addEventListener("click",()=>{
    let activeElement = document.querySelector(".dateActive");
    if(activeElement){
      activeElement.classList.remove("dateActive")
      element.classList.add("dateActive");
    }
    else{
      element.classList.add("dateActive");
    }
  })
})




// urlParams