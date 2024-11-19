// Import the necessary functions from Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFcYTP81HkpKz468_YVdZjbdpn7BSEzIc",
    authDomain: "movie-ticket-booking-a713e.firebaseapp.com",
    projectId: "movie-ticket-booking-a713e",
    storageBucket: "movie-ticket-booking-a713e.firebasestorage.app",
    messagingSenderId: "791048807463",
    appId: "1:791048807463:web:bbb600b5a3a3b2e26eda02",
    measurementId: "G-ZK48NYGYDP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Select form elements
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

// Helper function to reset error messages
function clearErrors() {
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";
}

// Regular expressions for validation
const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{5,15}$/; 
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; 

// Function to validate form fields
function validateForm() {
    clearErrors();
    let isValid = true;

    // Username validation
    if (!usernameRegex.test(nameInput.value)) {
        errorName.textContent = "Username must be 5-15 characters long, containing only letters and numbers, with at least one letter and one number.";
        isValid = false;
    } else if (nameInput.value.length < 3 || nameInput.value.length > 12) {
        errorName.textContent = "Name must be between 3 and 12 characters.";
        isValid = false;
    }

    // Email validation
    if (!emailRegex.test(emailInput.value)) {
        errorEmail.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Password validation
    if (!passwordRegex.test(passwordInput.value)) {
        errorPassword.textContent = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
        isValid = false;
    }

    return isValid;
}


function remocelogianbtn() {
   
}

function removloginbtl() {
   
}

// Form submission event listener
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateForm()) return;

    remocelogianbtn();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Firebase function to create a new user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account created successfully!");
            window.location.href = "/index.html"; // Redirect after successful signup
            removloginbtl(); // Re-enable login button
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});
