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
   console.log(snapshot)
  if (snapshot.exists()) {
    const movieData = snapshot.val();

    console.log("Movie Data:", movieData);
   
    moviename.innerHTML = `
     <img src="${movieData.movieImg}" alt="${movieData.title}" />
      <h1>${movieData.title}</h1>
      <p> ${movieData.Languages}</p>
    `;
   const movieimg=localStorage.setItem("movieimg",movieData.movieImg)

    localStorage.setItem('title',JSON.stringify(movieData.title))

  } else {
    console.log("No movie found with the given ID.");
  }
}

fetchMovieDetails();



function renderDate(arr){
  let newContainer = document.createDocumentFragment();

  for(let date of arr){
    let createDiv = document.createElement("div");
  createDiv.textContent = date;
  createDiv.classList.add("dateItems")
  
  
       createDiv.querySelector(".dateItems")
  newContainer.appendChild(createDiv);
 
  }
 document.querySelector("#dateContainer").append(newContainer)
 
 }


 getDates()

// listerer for dateActive
let activeis=false
document.querySelectorAll(".dateItems").forEach((element)=>{
  element.addEventListener("click",()=>{
    let activeElement = document.querySelector(".dateActive");
    if(activeElement){
       
      activeElement.classList.remove("dateActive")
      element.classList.add("dateActive");
      activeis=true
      console.log(element);
        
      localStorage.setItem("selectedDate",element.innerHTML)

    }
    else{
      element.classList.add("dateActive");
document.querySelectorAll(".showTimings").forEach((element)=>element.style.display="flex");

    }
  })
})


//  fetch the theater in firebase
async function fetchtheaterDetails(){
  console.log(movieName);
  
const theatre=ref(db,`theatre/${movieName}`)

  const data=await get(theatre);
// let currentTime = new Date().toLocaleTimeString();
  const container = document.querySelector("#theatresContainer");
  if (data.exists()) {
    const theatreData = data.val();
    console.log(theatreData);
    for (let theatre in theatreData){
      console.log(theatre);
      const div =document.createElement("div")
      const list = div.classList;
  list.toggle("showdiv");
      div.innerHTML= `<a class=" theaterName">${theatreData[theatre].theaterName}</a>
      <div class="timeContainer"></div>
     
         <div class="service">
      <div class="mobil">
      <img src="/assets/image/check.png" alt="" claas="mobil" >
 <label for="">M-Ticket</label>

 </div>
 <div class="food"> 
   <img src="/assets/image/food (1).png" alt="" class="food">
      <label for="">Food & Beverage</label>
     </div >

    </div>
  ` 

const timeContainer=div.querySelector(".timeContainer")
theatreData[theatre].times.forEach(time=>{

  const a = document.createElement("p")
  a.textContent=time
  a.classList.add("time")
  timeContainer.appendChild(a)

  a.addEventListener("click",()=>{
   let theaterName= div.querySelector(".theaterName").textContent.trim()
   console.log(theaterName);

   localStorage.setItem("theaterName",theaterName)
    localStorage.setItem("movieTime",time)
       if (activeis ){
          window.location.href="Seat.html"
       }
       
    console.log(theaterName);
  })
})

  container.appendChild(div)
    }
  }
else{
  console   .log("not found")
}

}

 fetchtheaterDetails()
// Other functions like `movieshow` can remain as they are or be further adjusted based on your logic.

 function getDates(){

  let dateArr = [];

  for(let i = 0; i < 7; i++){
    let newDate = new Date();
    newDate.setDate(newDate.getDate()+i);
   
    
  let options={ weekday: 'short', day: 'numeric'};
  let formatDate = new Intl.DateTimeFormat('en-US', options).format(newDate)
  dateArr.push(formatDate)
  console.log(dateArr);

  
  }

  renderDate(dateArr);
 

 }