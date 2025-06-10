// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Variables
const previousbutton = document.querySelector(".back-button");
const selectedDate = localStorage.getItem("selectDate");
const selectedtheater = localStorage.getItem("theaterName");
const seatContainer = document.getElementById('seatContainer');
const showId = 2;


// Back button
previousbutton.addEventListener("click", () => {
  window.history.back();
});

// Ticket Summary UI Update
     const SEAT_PRICE = 190;
        let selectedSeats = [];
        let totalPrice = 0;
        console.log();
// Fetch seat layout from backend
fetch(`http://localhost:8080/seats/show/${showId}`)
  .then(response => response.json())
  .then(seats => {
    let rows = {};

    seats.forEach(seat => {
      if (!rows[seat.rowLabel]) {
        rows[seat.rowLabel] = [];
      }
      rows[seat.rowLabel].push(seat);
    });

    Object.keys(rows).sort().forEach(rowLabel => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      const sortedSeats = rows[rowLabel].sort((a, b) => a.columnNumber - b.columnNumber);

      sortedSeats.forEach((seat) => {
        const seatDiv = document.createElement('div');
        const seatLabel = `${seat.rowLabel}${seat.columnNumber}`;  
        seatDiv.className = `seat ${seat.booked ? 'booked' : 'available'}`;
        seatDiv.innerText = seatLabel;
        

        // Add gap after column 4 and 12
        if (seat.columnNumber === 4 || seat.columnNumber === 12) {
          const gap = document.createElement('div');
          gap.classList.add('gap');
          rowDiv.appendChild(gap);
        }
       
        

        // Only add click event if not booked
        if (!seat.booked) {
          seatDiv.addEventListener('click', () => {
            if (seatDiv.classList.contains('selected')) {
              // Deselect
              seatDiv.classList.remove('selected');
              const index = selectedSeats.indexOf(seatLabel);
              if (index !== -1) {
                selectedSeats.splice(index, 1);
                totalPrice -= SEAT_PRICE;
              }
            } else {
              // Select
              seatDiv.classList.add('selected');
            selectedSeats.push(seatLabel);
              totalPrice += SEAT_PRICE; 
            }

            updateTicketSummary();
          });
        }

        function updateTicketSummary() {
          const ticketSummary = document.getElementById("ticketSummary");
          const totalPriceElement = document.getElementById("totalPrice");
          const selectedSeatsElement = document.getElementById("selectedSeats");

          ticketSummary.textContent = `${selectedSeats} Tickets`;

          totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;
          selectedSeatsElement.textContent = `Selected Seats: ${selectedSeats.join(", ")}`;
        }

        rowDiv.appendChild(seatDiv);
      });

      seatContainer.appendChild(rowDiv);
    });

   
  })
  .catch(error => console.error('Error loading seats:', error));

// Confirm booking
document.getElementById("confirmBooking")
  .addEventListener("click", function () {
    if (selectedSeats.length === 0) {
      alert("No seats selected!");
      return;
    }
    if (selectedSeats.length >= 10) {
      alert("You can only select less than 10 seats.");
      return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("totalPrice", totalPrice);
    window.location.href = "/booking.html";
  });
