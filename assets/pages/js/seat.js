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

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedtheater = urlParams.get("theatername");
console.log(selectedtheater);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let seatContainer = document.querySelector(".layout");

let selectedSeats = [];
let totalPrice = 0;
const SEAT_PRICE = 190;

// Function to toggle seat selection
function toggleSeatSelection(seatElement) {
  // Check if the seat is already selected
  if (seatElement.classList.contains('selected')) {
    // Deselect the seat
    seatElement.classList.remove('selected');
    const seatIndex = selectedSeats.indexOf(seatElement.textContent);
    if (seatIndex > -1) {
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
function renderLayout(dataObj) {
  seatContainer.innerHTML = ''; // Clear any previous seat layout

  dataObj.forEach((rowData, rowIndex) => {
    let container = document.createElement("div");
    container.classList.add("row");
    let innerArr = rowData.split(" ");
    
    innerArr.forEach((seat, seatIndex) => {
      let newBox = document.createElement("p");

      if (seat === "_" || seat === "x" || seat === "") {
        newBox.classList.add("hide");
        newBox.textContent = seat;
      } else {
        newBox.classList.add("column");
        
        // Generate seat labels like A1, A2, A3, etc.
        const seatLabel = String.fromCharCode(65 + rowIndex) + (seatIndex + 1);
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

    if (response.exists()) {
      const data = response.val();
      renderLayout(data);
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
  if (selectedSeats.length > 0) {
    // Store selected seats in local storage after confirmation
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('totalPrice', totalPrice);

    alert(`Booking Confirmed for seats: ${selectedSeats.join(", ")}. Total: ₹${totalPrice}`);
    
    // Optionally, navigate to another page or trigger payment
    // window.location.href = 'confirmationPage.html';
  } else {
    alert("No seats selected!");
  }
});
