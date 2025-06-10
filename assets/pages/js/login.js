// Import Firebase SDK functions
console.log("clicked signout")
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// import { checkLoggedIn } from "./isloggedIn";

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

// Get login form and button elements
const form = document.querySelector("form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordError = document.getElementById("confirmpasswordError");




form.addEventListener("submit", (event) => hanleLogin(event));


function hanleLogin(event) {
  console.log("entered handle login function");

  event.preventDefault(); 

  const email = usernameInput.value;
  const password = passwordInput.value;

  console.log("Email =" + email);
  console.log("Password =" + password);

  if (email == "" || password == "") {
    confirmPasswordError.innerHTML = "Invalid Email or Password";
    return;
  }
  if(password.value>6){
    confirmPasswordError.innerHTML = " Password  Must 6 Character ";

  }


  signInWithEmailAndPassword(auth, email, password,)
    .then((userCredential) => {
    

      alert("Login successful!");
      // checkLoggedIn(true)
      localStorage.setItem("loggedInAccount",email)
      window.location.href = "/index.html";
      

      // Redirect upon success
    })
    .catch((error) => {
      // Display error
      confirmPasswordError.innerText = "Email or Password Incorret"
      error.message;
      console.log(error);
     
    });
}



