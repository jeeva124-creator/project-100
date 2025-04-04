// Firebase and other initialization code stays as it is
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

// Retrieve selected seats and total price from localStorage
const movie = localStorage.getItem('title')
const timeing = localStorage.getItem("movieTime")
const theaterName = localStorage.getItem("theaterName")
const totalPrice = localStorage.getItem('totalPrice') || 0;


let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

let ShowDate = localStorage.getItem("selectDate")
let ShowTime = localStorage.getItem("movieTime")

async function saveBookedSeats() {
   


    const theaterTimeRef = ref(db, `booked/${theaterName}/${ShowDate}/${ShowTime}`);

    let bookedSeatsData = await get(theaterTimeRef)

    if (bookedSeatsData.exists()) {
        let bookedSeats = bookedSeatsData.val()
        bookedSeats = bookedSeats.filter(seat => seat != undefined)
        selectedSeats = selectedSeats.concat(bookedSeats)

    }



    await set(theaterTimeRef, selectedSeats, ShowDate);


}


window.onload = () => {

    const selectedSeatsText = document.getElementById('selectedSeatsText');
    const totalPriceText = document.getElementById('totalPriceText');
    const moviename = document.getElementById("moviename")
    const showtimes = document.getElementById("showtimes")
    const theater = document.getElementById("theatername")

    selectedSeatsText.textContent = `Selected Seats: ${selectedSeats.join(', ')}`;
    totalPriceText.textContent = `Total Price: ₹${totalPrice}`;
    moviename.textContent = `Moviename:${movie.slice(1, -1)}`
    showtimes.textContent = `Show Time:${timeing} | ${ShowDate}`
    theater.textContent = `Theater Name:${theaterName}`

};


// Handle the "Credit/Debit Card" payment option
document.getElementById('creditCardBtn').addEventListener('click', function () {
    saveBookedSeats()
    processPayment("Credit/Debit Card");


});
let movieimg = localStorage.getItem("movieimg")
// Handle the "UPI Payment" option
document.getElementById('upiBtn').addEventListener('click', function () {
saveBookedSeats()
    processPayment("UPI");

});

let Name = document.getElementById("name")

// Function to simulate payment process
function processPayment(paymentMethod) {
    const paymentStatus = document.getElementById('paymentStatus');

    // Get user input values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name.value !== Number && name.value > 3) {

    }

    if (!name || !phone) {
        alert("Please fill out all the fields.");
        return;
    }

    generateTicket(name, phone)

    window.location.href = "/ticket.html"


}

// Function to generate the ticket
function generateTicket(name, phone) {


    // Retrieve selected seats and total price from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || 0;



    saveTicketInfo(name, phone, movie, selectedSeats, totalPrice)

}

async function saveTicketInfo(name, phone, movie, selectedSeats, totalPrice) {

    let data = {
        name, phone, movie, selectedSeats, totalPrice, timeing, ShowDate
    }
    console.log(data);

    let userEmail = localStorage.getItem("loggedInAccount").replace(".", "_")
    console.log(userEmail);

    const theaterTimeRef = ref(db, `orders/${userEmail}`);

    await push(theaterTimeRef, data);

    window.location.pathname = "/ticket.html"

}
let backButton = document.querySelector(".back-button")
backButton.addEventListener("click", () => {
    window.history.back()
})



