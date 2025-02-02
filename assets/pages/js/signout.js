import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  signOut,
  getAuth
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFcYTP81HkpKz468_YVdZjbdpn7BSEzIc",
  authDomain: "movie-ticket-booking-a713e.firebaseapp.com",
  projectId: "movie-ticket-booking-a713e",
  storageBucket: "movie-ticket-booking-a713e.firebasestorage.app",
  messagingSenderId: "791048807463",
  appId: "1:791048807463:web:bbb600b5a3a3b2e26eda02",
  measurementId: "G-ZK48NYGYDP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the auth instance

console.log("lodeads");

// Logout button event listener
 let logout=document.querySelector(".logout-btn")
 logout.addEventListener("click", function () {
  console.log("Sign-out initiated...");
  alert("Logging out...");

  // Firebase sign-out process
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    
      localStorage.clear();

   
      document.getElementById("logout-btn").style.display = "none";

 
      window.location.href = "../../../index.html";
    })
    .catch((error) => {
    
      console.error("An error occurred during sign-out:", error.message);
      alert("Sign-out failed. Please try again.");
    });
});
