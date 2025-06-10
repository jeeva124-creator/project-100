// Card validation and formatting
function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];


    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
}



function formatExpiryDate(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
        return v.slice(0, 2) + '/' + v.slice(2, 4);
    }

    return v;

}
let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats") || "[]").join(", ");
let selectDate=localStorage.getItem("selectDate")
let movieimg=localStorage.getItem("movieimg")
let theater=localStorage.getItem("theater")
let showtime=localStorage.getItem("showtime")
let totalPrice=localStorage.getItem("totalPrice")
let title=localStorage.getItem("title")
let recipientMail = localStorage.getItem("loggedInAccount");
let username=localStorage.getItem("userName")

  let movieinfo=document.querySelector(".movie-info")
  movieinfo.innerHTML=`
     <img src="${movieimg}" alt="Movie Poster" class="movie-poster">
               <div class="movie-details">
                  <h1>${title.slice(0,)}</h1>
                 <p class="showtime">${showtime}</p>
                  <p class="showtime">${theater}</p>
                     <div class="seat-info">
                         <p>Adult Tickets</p>
                     </div>
                 </div>

  `
   

// Form handling
   document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');
    const cardNumber = document.getElementById('card-number');
    const expiry = document.getElementById('expiry');
    const payButton = document.querySelector('.pay-button');
    const modal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');
    const paymentMethods = document.querySelectorAll('.payment-method');
    let orderSummary=document.querySelector(".order-summary")
  orderSummary.innerHTML=

    `<h2>Order Summary</h2>
                    <div class="summary-items">
                        <div class="summary-item">
                            <span> Adult Tickets</span>
                            <span>₹${totalPrice}</span>
                        </div>
                    </div>
                  
                    <button type="submit" class="pay-button" id="pay-button">
                        <span class="button-text">₹${totalPrice}</span>
                        <div class="spinner"></div>
                    </button>`

    cardNumber.addEventListener('input', (e) => {
        e.target.value = formatCardNumber(e.target.value);
    });


    expiry.addEventListener('input', (e) => {
        e.target.value = formatExpiryDate(e.target.value);
    });

    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
        });
    });
    let loggedInAccount=localStorage.getItem("loggedInAccount")
    let paybtn = document.getElementById('pay-button')

       paybtn.addEventListener("click",(e)=>{
        e.preventDefault()
   var options = {
                "key": "rzp_test_IcmcJwBe9zwcga", // Your test Key ID
                "amount": totalPrice, // Amount is in paise (100 INR)
                "currency": "INR",
                "name": username,
                "description": "Test Transaction",
                "image": "https://yourdomain.com/logo.png", // Optional
                // "order_id": "order_XXXX", // Optional - used if backend is creating orders
                "handler": function (response) {
                    alert("Payment ID: " + response.razorpay_payment_id);
                    // You can send this ID to your server to verify payment
                },
                "prefill": {
                    "name": username,
                    "email":loggedInAccount,
                    
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            var rzp = new Razorpay(options);
            rzp.open();
       })
       
         
        
    // Form submission
    form.addEventListener('submit', async (e) => {

        e.preventDefault();
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        modal.style.display = 'flex';
        // payButton.classList.remove('loading');
        // Generate random booking reference
        const bookingRef = document.getElementById('booking-ref');
        bookingRef.textContent = 'MOV-' + Math.random().toString(36).substr(2, 5).toUpperCase();
       
         sendTicketEmail();
        SaveDateBase() 
        
    });

    emailjs.init("3Hd_ekhPnP-jId24T"); //initializing email js

    function sendTicketEmail() {    // data object sent to email js
        const templateParams = {
            to_email: recipientMail,
            movieimg: movieimg,
            selectedDate: selectDate,
            movieTime: showtime,
            theaterName: theater,
            title: title,
            selectedSeats: selectedSeats,
            totalPrice: totalPrice
        };

        emailjs
            .send("service_ghq1axa", "template_bpcr8wl", templateParams)
            .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Ticket has been sent to your email!");
            },
            function (error) {
                console.error("FAILED...", error);
                alert("Failed to send ticket. Please try again.");
            }

        );
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
    });

});

function SaveDateBase(){
    // Prepare booking data from localStorage

const bookingData = {

  movieName: title?.slice(0, -1), 
  showTime: showtime,
  seats: JSON.parse(selectedSeats), 
  theaterName: theater,
  date: selectDate,
  totalPrice: parseFloat(totalPrice)

};


// Send POST request
fetch('http://localhost:8080/api/booking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bookingData),
})
  .then(response => response.json())
  .then(data => {
    console.log('Booking created:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
