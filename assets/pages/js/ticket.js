let image=localStorage.getItem("movieimg")
let selectedDate=localStorage.getItem("selectedDate")
let selectedtime=localStorage.getItem("movieTime")
let theatername=localStorage.getItem("theaterName")
let movieTitle=localStorage.getItem("title")
let seats=localStorage.getItem("selectedSeats")
let totalprice=localStorage.getItem("totalPrice")




function TicketLoded(){
 
    document.body.innerHTML=`
    
<div class="m-ticket">
  
  <p class="m">M-Ticket</p>
  
  <div class="movie-details">
    <img src="${image}" class="poster">
    
    <div class="movie">
      <h4>${movieTitle.slice(1,-1)}</h4>
      
      <p>Tamil, 2D</p>
      <p>${selectedDate} | ${selectedtime}</p>
      <p>${theatername}</p>
    </div>
    
  </div>
  
  <div class="info">
    Tap for support, details & more actions
  </div>
  
  <div class="ticket-details">
    <img src="https://pngimg.com/uploads/qr_code/qr_code_PNG2.png" class="scan">
    
    <div class="ticket">
      <p>3Ticket(s)</p>
      
      <b>SCREEN 1</b>
      
      <p>PR-${seats.slice(1,-1)}</p>
      
      <h6>BOOKING ID: Tbafeq7</h6>
      
    </div>
    
  </div>
  
  <div class="info-cancel">
   Cancellation not available for this venue
  </div>
  
  <div class="total-amount">
    <p>Total Amount</p>
    
    <p>Rs.${totalprice}</p>
  </div>
  <p>Payment Successful!</p>
  
 <p> Thank you for booking your tickets, </p>
        <a href="/index.html">Go to home page</a>`;
  

}
TicketLoded()