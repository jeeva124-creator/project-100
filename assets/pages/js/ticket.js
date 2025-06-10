// Get values from localStorage
let movieimg = localStorage.getItem("movieimg");
let selectedDate = localStorage.getItem("selectedDate");
let movieTime = localStorage.getItem("movieTime");
let theaterName = localStorage.getItem("theaterName");
let title = localStorage.getItem("title");
let selectedSeats = localStorage.getItem("selectedSeats");
let totalPrice = localStorage.getItem("totalPrice");
let recipientMail = localStorage.getItem("loggedInAccount");

console.log(recipientMail);

// Clean string if necessary (e.g., removing quotes from stringified values)
if (title?.startsWith('"') || title?.startsWith("'")) {
  title = title.slice(1, -1);
}
if (selectedSeats?.startsWith('"') || selectedSeats?.startsWith("'")) {
  selectedSeats = selectedSeats.slice(1, -1);
}

// Initialize EmailJS
emailjs.init("3Hd_ekhPnP-jId24T"); // Replace with your EmailJS public key

function sendTicketEmail() {
  const templateParams = {
    to_email: recipientMail,
    movieimg: movieimg,
    selectedDate: selectedDate,
    movieTime: movieTime,
    theaterName: theaterName,
    title: title,
    selectedSeats: selectedSeats,
    totalPrice: totalPrice
  };

  emailjs
    .send("service_s9egnjs", "template_bpcr8wl", templateParams)
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
