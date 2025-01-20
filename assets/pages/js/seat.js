// Firebase and other initialization code stays as it is
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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


let previousbutton=document.querySelector(".back-button")
let selectedDate=localStorage.getItem('selectedDate')

previousbutton.addEventListener("click",()=>{

  window.history.back()
})

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedtheater = localStorage.getItem("theaterName");
console.log(selectedtheater);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let seatContainer = document.querySelector(".layout");

let selectedSeats = [];
let totalPrice = 0;
const SEAT_PRICE = 190;

let selectis=false
function toggleSeatSelection(seatElement) {
if (seatElement.classList.contains('bookedseat') ){
return
}
  if (seatElement.classList.contains('selected') ) {
    // Deselect the seat
    seatElement.classList.remove('selected');
    selectis=true

    const seatIndex = selectedSeats.indexOf(seatElement.textContent);
    if (seatIndex > -1 ) {
      selectedSeats.splice(seatIndex, 1);
      totalPrice -= SEAT_PRICE;
    }
    
  } else {
      seatElement.classList.add('selected');
    selectedSeats.push(seatElement.textContent);
    totalPrice += SEAT_PRICE;
  }
  updateTicketSummary();
}

// Function to update ticket summary
function updateTicketSummary() {
  const ticketSummary = document.getElementById('ticketSummary');
  ticketSummary.textContent = `${selectedSeats.length} Tickets`;

  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;

  const selectedSeatsElement = document.getElementById('selectedSeats');
  selectedSeatsElement.textContent = `Selected Seats: ${selectedSeats.join(', ')}`;
}

// Function to handle seat rendering
function renderLayout(dataObj,bookedSeats) {
  seatContainer.innerHTML = ''; // Clear any previous seat layout
  console.log(dataObj);
 
  
  dataObj.forEach((rowData, rowIndex) => {
    let container = document.createElement("div");
    container.classList.add("row");
    rowData=rowData.split(" ")
  
      
      
      rowData.forEach((seat) => {
        const seatLabel = String.fromCharCode(65 + rowIndex) + (seat);
        let isBooked;
        console.log(seatLabel);
        console.log(bookedSeats);
        
        
        if (!Array.isArray(bookedSeats)) {
          isBooked=false;
        }
        else{
          isBooked=bookedSeats.includes(seatLabel);
        }
  

     let newBox = document.createElement("p");

     if (seat === "_" || seat === "x" || seat === "") {
       newBox.classList.add("hide");
       newBox.textContent = seat;
     } else {
       newBox.classList.add("column");
       if (isBooked){
        console.log(seatLabel);
        
        newBox.classList.add("bookedseat");
       }
          newBox.textContent = seatLabel;

       // Add event listener for seat selection
       newBox.addEventListener('click', function () {
         if (!newBox.classList.contains('sold')) {
           toggleSeatSelection(newBox);
         }
       });
     }

     container.appendChild(newBox);
     
   
    });
    seatContainer.appendChild(container);
  });
}

// Fetch seat layout from Firebase and render
async function getLayout() {
  try {

    const getref = ref(db, `theatres/${selectedtheater}/seats`);
    const response = await get(getref);

    const bookedSeatRef=ref(db, `booked/${selectedtheater}/${selectedDate}`);
    const bookedSeatResponse=await get(bookedSeatRef)
    if (response.exists()) {
      const data = response.val();
      const bookedSeats=bookedSeatResponse.val()
      console.log(data);
      
      renderLayout(data,bookedSeats);

    } else {
      console.log("Error: No seat data found");
    }
  } catch (err) {
    console.log("Error fetching layout:", err);
  }
}

// Initial call to get seat layout
getLayout();

// Handle the confirm booking button click

document.getElementById('confirmBooking').addEventListener('click', function () {
  if (selectedSeats.length > 0  && selectedSeats.length<10) {
    
      
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      localStorage.setItem('totalPrice', totalPrice);
  window.location.href='/booking.html'
  
  }
  else if (selectedSeats.length>=10){
     alert("seats selected less than 10")
  }
  
  else {
    alert("No seats selected !");
    return;
  }
});




