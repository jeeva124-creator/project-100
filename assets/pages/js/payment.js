// Firebase and other initialization code stays as it is
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set,get,push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
const movie =localStorage.getItem('title')
const timeing=localStorage.getItem("movieTime")
const theaterName=localStorage.getItem("theaterName")
const totalPrice = localStorage.getItem('totalPrice') || 0;


let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
console.log(selectedSeats
    
)
let ShowDate=localStorage.getItem("selectedDate")
console.log(ShowDate);


async function saveBookedSeats() {
        console.log(selectedSeats);

        const theaterTimeRef = ref(db, `booked/${theaterName}/${ShowDate}`);

        let bookedSeatsData=await get(theaterTimeRef)
        
        if (bookedSeatsData.exists()) {
          let bookedSeats=bookedSeatsData.val()
          bookedSeats=bookedSeats.filter(seat=>seat!=undefined)
          selectedSeats=selectedSeats.concat(bookedSeats)
          
        }


        console.log(selectedSeats);
        
        await set(theaterTimeRef, selectedSeats,ShowDate); 
        console.log("data added");
        
        
  }


window.onload = () => {
   
    const selectedSeatsText = document.getElementById('selectedSeatsText');
    const totalPriceText = document.getElementById('totalPriceText');
    const moviename=document.getElementById("moviename")
    const showtimes=document.getElementById("showtimes")
    const  theater= document.getElementById("theatername")

    selectedSeatsText.textContent = `Selected Seats: ${selectedSeats.join(', ')}`;
    totalPriceText.textContent = `Total Price: ₹${totalPrice}`;
    moviename.textContent=`Moviename:${movie.slice(1,-1)}`
    showtimes.textContent=`Show Time:${timeing } | ${ShowDate}`
    theater.textContent=`Theater Name:${theaterName}`

};
console.log();
let movieTicket=document.querySelector(".ticket")
// Handle the "Credit/Debit Card" payment option
document.getElementById('creditCardBtn').addEventListener('click', function () {
    processPayment("Credit/Debit Card");
    
    

   
});
 let  movieimg=localStorage.getItem("movieimg")
// Handle the "UPI Payment" option
document.getElementById('upiBtn').addEventListener('click', function () {
    processPayment("UPI");
  
});

let Name=document.getElementById("name")

// Function to simulate payment process
function processPayment(paymentMethod) {
    const paymentStatus = document.getElementById('paymentStatus');
    
    // Get user input values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
   
    if (name.value!==Number && name.value>3 ){
                   
    }

    if (!name|| !phone) {
        alert("Please fill out all the fields.");
        return;
    }

    // Simulate a payment process

    // paymentStatus.style.display = 'block';
    // paymentStatus.textContent = `Processing your payment via ${paymentMethod}...`;

       window.location.href="/ticket.html"
    // Simulate a success message (you can integrate actual payment gateways here)
    // setTimeout(() => {
    //     paymentStatus.innerHTML = `<p>Payment Successful! Thank you for booking your tickets, ${name}.</p>
    //     <a href="/index.html">Go to home page</a>`;
    //     saveBookedSeats()
    //     // After payment, generate the ticket
    //     generateTicket(name, phone);  

    
    // }, 3000);


}

// Function to generate the ticket
function generateTicket(name, phone) {
    const ticketContainer = document.getElementById('ticketContainer');
    const ticketDetails = document.getElementById('ticketDetails');

    // Retrieve selected seats and total price from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || 0;

    // Format ticket details
    ticketDetails.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>moviename:</strong> ${movie}<br>
        <strong>Seats:</strong> ${selectedSeats.join(', ')}<br>
        <strong>Time& Date:</strong> ${timeing}<br>
        <strong>Total Price:</strong> ₹${totalPrice}
    `;

    saveTicketInfo(name,phone,movie,selectedSeats,totalPrice)
    // Show the ticket container
    document.getElementById("ticket-summary").style.visibility="hidden"
    ticketContainer.style.display = 'block';

}

async function  saveTicketInfo(name,phone,movie,selectedSeats,totalPrice){

    let data={
      name,phone,movie,selectedSeats,totalPrice,timeing,ShowDate
    }
    let userEmail=localStorage.getItem("loggedInAccount").replace(".","_")
    const theaterTimeRef = ref(db, `orders/${userEmail}`);
   
    await push(theaterTimeRef, data); 
    
}
let backButton=document.querySelector(".back-button")
backButton.addEventListener("click",()=>{
    window.history.back()
})




// const ticket = document.querySelector('.m-ticket');

// const body = document.querySelector('body');
