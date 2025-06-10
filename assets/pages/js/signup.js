

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';


import { getAuth, onAuthStateChanged, signOut ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


// Listen for authentication state changes

function addUser (email,userName){
  const sanitizedEmail = email.replace('.', ',');
  set(ref(db, 'users/' + sanitizedEmail), userName)  
  .then(() => {
      console.log("User name add  successfully!");
      window.location.href = "/index.html";

  })
  .catch((error) => {
      console.error("Error saving movie:", error);
  });

}
// Logout functionality
let nameInput =document.getElementById("name")
let emailInput =document.getElementById("email")
let passwordInput =document.getElementById("password")
document.addEventListener("DOMContentLoaded",(e)=>{
   


      // Signup functionality
      const form = document.getElementById("form");
      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
      
          if (!validateForm()) return;
      
          const username = nameInput.value;
          const email = emailInput.value;
          const password = passwordInput.value;
      
          localStorage.setItem("userName", username);
          localStorage.setItem("loggedInAccount",email);
          createUserWithEmailAndPassword(auth, email, password)
            
          .then((userCredential) => {


              console.log("User created:", userCredential);
           addUser(email,username)
            })
            .catch((error) => {
              console.error("Signup error:", error.message);
              alert(`Error: ${error.message}`);
            });
        });
      }
})

// Validation function
function validateForm() {
  clearErrors();
  let isValid = true;
 
  if (false) {
    errorName.textContent = "Username must be 5-15 characters, include letters and numbers.";
    isValid = false;

  }
 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    errorEmail.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(passwordInput.value)) {
    errorPassword.textContent = "Password must include 8 characters, uppercase, lowercase, and a number.";
    isValid = false;
  }

  
  return isValid;

}

function clearErrors() {
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorPassword.textContent = "";

}
