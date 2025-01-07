// Retrieve selected seats and total price from localStorage
const movie =localStorage.getItem('title')
window.onload = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || 0;
  
    const selectedSeatsText = document.getElementById('selectedSeatsText');
    const totalPriceText = document.getElementById('totalPriceText');
    const moviename=document.getElementById("moviename")

    selectedSeatsText.textContent = `Selected Seats: ${selectedSeats.join(', ')}`;
    totalPriceText.textContent = `Total Price: ₹${totalPrice}`;
    moviename.textContent=`Moviename:${movie}`
};
console.log();

// Handle the "Credit/Debit Card" payment option
document.getElementById('creditCardBtn').addEventListener('click', function () {
    processPayment("Credit/Debit Card");
  
});

// Handle the "UPI Payment" option
document.getElementById('upiBtn').addEventListener('click', function () {
    processPayment("UPI");
  
});

// Function to simulate payment process
function processPayment(paymentMethod) {
    const paymentStatus = document.getElementById('paymentStatus');
    
    // Get user input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (!name || !email || !phone) {
        alert("Please fill out all the fields.");
        return;
    }

    // Simulate a payment process
    paymentStatus.style.display = 'block';
    paymentStatus.textContent = `Processing your payment via ${paymentMethod}...`;


    // Simulate a success message (you can integrate actual payment gateways here)
    setTimeout(() => {
        paymentStatus.textContent = `Payment Successful! Thank you for booking your tickets, ${name}.`;

        // After payment, generate the ticket
        generateTicket(name, email, phone);  
       

    }, 3000);
}

// Function to generate the ticket
function generateTicket(name, email, phone) {
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
        <strong>Email:</strong> ${email}<br>a
        <strong>Phone:</strong> ${phone}<br>
          <strong>moviename:</strong> ${movie}<br>
        <strong>Seats:</strong> ${selectedSeats.join(', ')}<br>
        <strong>Total Price:</strong> ₹${totalPrice}
    `;

    // Show the ticket container
    ticketContainer.style.display = 'block';
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
