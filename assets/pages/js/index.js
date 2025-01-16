
//   <!-- Firebase App -->

import { getAuth, onAuthStateChanged, signOut ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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
const auth = getAuth();

const usersRef = ref(db, "/movies");

const searchBar = document.querySelector(".search-input");
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
  let logout=document.querySelector(".logout-btn")
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
        console.log(data);
        let loggedInUserName=document.querySelector(".loggedInUserName")
        loggedInUserName.textContent=data
      }
    });
   
    

  console.log("userlogin");
    console.log(loginButton);

    if (loginButton) {
      loginButton.style.display = "none";
      logout.style.display = "block";

    }

    if (offcanvasSidebar) {
      const bootstrapOffcanvas = new bootstrap.Offcanvas(offcanvasSidebar);
      bootstrapOffcanvas.show();
    }
  } else {
    
    if (loginButton) {
      loginButton.style.display = "block";
      logout.style.display = "none";


    }
  }
}
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
          <a href="./../../../movie_details.html?movieId=${index}" class="bookTicketButton">Book Ticket</a>
          <p id="error"></p>`;

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
  const error = document.querySelector('.error'); 

 
  document.getElementById("carouselExample").style.display = "none";

  movies.forEach((movie) => {
    const isVisible = movie.name.toLowerCase().includes(value);
    
    movie.element.style.display = isVisible ? "block" : "none";
    
    if (searchBar.value === "") {
     
      window.location.reload();
      document.getElementById("carouselExample").style.display = "block";
    }

    if (isVisible) {
      isAnyMovieVisible = true;
    }
  });

  if (!isAnyMovieVisible) {
   
    if (!error) {
     let  footer=document.querySelector(".footer")
      const errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.innerHTML = "Movie not found";
      document.body.appendChild(errorElement);
      footer.style.display="none"

    } else {
      error.style.display = "block";
    }
  } else {
    // Hide error message if movies are found
    if (error) {
      error.style.display = "none";
    }
  }
});


// console.log(movie)

// Profile page view

let profileIcon = document.querySelector(".user-actions");

profileIcon.addEventListener("click", ()=>{
    window.location.href = "..../../../../../profile.html";
})