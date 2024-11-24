import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    signOut,getAuth
  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
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
  
document.getElementById("logeout-btn").addEventListener("click", function() {
    // Log out logic
    console.log("clicked signout")
    alert("Logging out..."); // This can be replaced with actual log-out logic
   
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("clicked signout")
      localStorage.clear();
      document.getElementById("logeout-btn").style.display="none";
   
      
        }).catch((error) => {
      // An error happened.
    });
    window.location.href = "../../../index.html"; 
})

