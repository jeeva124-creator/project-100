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


async function saveBookedSeats() {
        console.log(selectedSeats);
        const theaterTimeRef = ref(db, `theatres/${theaterName}/bookedSeats/`);
        let bookedSeatsData=await get(theaterTimeRef)
        if (bookedSeatsData.exists()) {
          let bookedSeats=bookedSeatsData.val()
          bookedSeats=bookedSeats.filter(seat=>seat!=undefined)
          selectedSeats=selectedSeats.concat(bookedSeats)
        }

        console.log(selectedSeats);
        
        await set(theaterTimeRef, selectedSeats); 
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
    moviename.textContent=`Moviename:${movie}`
    showtimes.textContent=`Show Time:${timeing}`
    theater.textContent=`Theater Name:${theaterName}`

};
console.log();
let movieTicket=document.querySelector(".ticket")
// Handle the "Credit/Debit Card" payment option
document.getElementById('creditCardBtn').addEventListener('click', function () {
    processPayment("Credit/Debit Card");
    
    
// movieTicket.innerHTML=` <div class="m-ticket">
      
//       <p class="m">M-Ticket</p>
      
//       <div class="movie-details">
//         <img src="https://pbs.twimg.com/media/FshgstvakAA5sE7.jpg" class="poster">
        
        
//         <div class="movie">
//           <h4>${movie}</h4>
          
          
//           <p>${time} | ${Date}</p>
//           <p>${theaterName}</p>
//         </div>
        
//       </div>
      
//       <div class="info">
//         Tap for support, details & more actions
//       </div>
      
//       <div class="ticket-details">
//         <img src="${movieimg}" class="scan">
        
//         <div class="ticket">
//           <p>3Ticket(s)</p>
          
//           <b>SCREEN 1</b>
          
//           <p>${selectedSeats.join(', ')}</p>
          
//           <h6>BOOKING ID: Tbafeq7</h6>
          
//         </div>
        
//       </div>
      
//       <div class="info-cancel">
//        Cancellation not available for this venue
//       </div>
      
//       <div class="total-amount">
//         <p>Total Amount</p>
        
//         <p>${totalPrice}</p>
//       </div>
      
//     </div>

  
// `

   
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
    paymentStatus.style.display = 'block';
    paymentStatus.textContent = `Processing your payment via ${paymentMethod}...`;


    // Simulate a success message (you can integrate actual payment gateways here)
    setTimeout(() => {
        paymentStatus.innerHTML = `<p>Payment Successful! Thank you for booking your tickets, ${name}.</p>
        <a href="/index.html">Go to home page</a>`;
        saveBookedSeats()
        // After payment, generate the ticket
        generateTicket(name, phone);  

       

    }, 3000);

//     movieTicket.innerHTML=` <div class="m-ticket">
      
//       <p class="m">M-Ticket</p>
      
//       <div class="movie-details">
//         <img src="https://pbs.twimg.com/media/FshgstvakAA5sE7.jpg" class="poster">
        
        
//         <div class="movie">
//           <h4>${movie}</h4>
          
          
//           <p>${movieTime} | ${Date}</p>
//           <p>${theaterName}</p>
//         </div>
        
//       </div>
      
//       <div class="info">
//         Tap for support, details & more actions
//       </div>
      
//       <div class="ticket-details">
//         <img src="${movieimg}" class="scan">
        
//         <div class="ticket">
//           <p>3Ticket(s)</p>
          
//           <b>SCREEN 1</b>
          
//           <p>${selectedSeats.join(', ')}</p>
          
//           <h6>BOOKING ID: Tbafeq7</h6>
          
//         </div>
        
//       </div>
      
//       <div class="info-cancel">
//        Cancellation not available for this venue
//       </div>
      
//       <div class="total-amount">
//         <p>Total Amount</p>
        
//         <p>${totalPrice}</p>
//       </div>
      
//     </div>
  
// `

}

// Function to generate the ticket
function generateTicket(name, phone) {
    const ticketContainer = document.getElementById('ticketContainer');
    const ticketDetails = document.getElementById('ticketDetails');

    // Retrieve selected seats and total price from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || 0;
  console.log(totalPrice);
  console.log(selectedSeats);


    // Format ticket details
    ticketDetails.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>moviename:</strong> ${movie}<br>
        <strong>Seats:</strong> ${selectedSeats.join(', ')}<br>
        <strong>Time:</strong> ${timeing}<br>
        <strong>Total Price:</strong> ₹${totalPrice}
    `;
    saveTicketInfo(name,phone,movie,selectedSeats,totalPrice)
    // Show the ticket container
    document.getElementById("ticket-summary").style.visibility="hidden"
    ticketContainer.style.display = 'block';

}

async function  saveTicketInfo(name,phone,movie,selectedSeats,totalPrice){

    let data={
      name,phone,movie,selectedSeats,totalPrice,timeing
    }
    let userEmail=localStorage.getItem("loggedInAccount").replace(".","_")
    const theaterTimeRef = ref(db, `orders/${userEmail}`);
   
    await push(theaterTimeRef, data); 
 

}


function downloadTicket() {
    const ticketDetails = document.getElementById('ticketDetails').innerText;
    
    // Create a Blob with the ticket content
    const blob = new Blob([ticketDetails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
   
    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}




const ticket = document.querySelector('.m-ticket');

const body = document.querySelector('body');

var dragvalue;


//for laptop & computer

ticket.addEventListener('mousedown', ()=>{
  
  ticket.style.position = "absolute";
  ticket.style.cursor = "move";
  dragvalue = ticket;
  
})



document.addEventListener('mouseup', ()=>{
  
  dragvalue = null;
  
})


document.addEventListener('mousemove', (e)=>{
  
  var x = e.clientX;
  var y = e.clientY;
  

 dragvalue.style.cursor = "move";
  
    var a = body.getBoundingClientRect();
  
  
    if(x > 0 && x < a.width - 350){
     dragvalue.style.left = x + "px";
  }
  
    if(y > 0 && y < a.height - 400){
     dragvalue.style.top = y + "px";
  }
  
})



//for mobile touch effect

document.addEventListener('touchstart', (e)=>{
  
  var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;
  
      var a = body.getBoundingClientRect();
  
  
    if(x > 0 && x < a.width - 350){
    ticket.style.left = x + "px";
  }
  
    if(y > 0 && y < a.height - 400){
     ticket.style.top = y + "px";
  }
  
})


document.addEventListener('touchmove', (e)=>{
  
   var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;
  
      var a = body.getBoundingClientRect();
  
  
    if(x > 0 && x < a.width - 350){
    ticket.style.left = x + "px";
  }
  
    if(y > 0 && y < a.height - 400){
     ticket.style.top = y + "px";
  }
  
})



document.addEventListener('touchend', (e)=>{
  
  ticket = null;
  
})


