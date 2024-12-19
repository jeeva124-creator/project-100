const querySelector=window.location.search
console.log(querySelector);

const params = new URLSearchParams(window.location.search);


console.log(params);



// console,log(moviename)
// Fetch theatre name
// Get movie details from localStorage
// const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
// const headerTitle = document.querySelector('header h1');
// const headerDetails = document.querySelector('header p');
// if (movieName && theatreName) {
//     headerTitle.textContent = movieName;
//     headerDetails.textContent = theatreName;
// } else {
//     headerTitle.textContent = "Movie not found";
//     headerDetails.textContent = "";
// }


document.addEventListener('DOMContentLoaded', () => {
   
    const seatData = {
        rs190: { rows: ['A', 'B', 'C', 'D', 'E', 'F',"G","H","I","J","K","L","M","N","O",], totalSeats: 30 },
        rs60: { rows: ['P', 'Q', "R"], totalSeats: 30 },
    };
    // if(seatData[R]==1,2){
    //     <i class="fa-solid fa-wheelchair"></i>
    // }
    const unavailableSeats = ['B7', 'C15', 'D19', 'L4', 'M10',"G10"]; 
    const bestsellerSeats = ['B12', 'C7', 'J9', 'J10', 'J11', 'K9', 'K10', 'K11']; 
    const selectedSeats = [];
    let totalPrice = 0;

    Object.keys(seatData).forEach((section) => {
        const seatContainer = document.getElementById(section);
        seatData[section].rows.forEach((row) => {
            for (let i = 1; i <= 18; i++) {
                const seatId = `${row}${i}`;
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.textContent = i;
             
                if (unavailableSeats.includes(seatId)) {
                    seat.classList.add('sold');
                } else if (bestsellerSeats.includes(seatId)) {
                    seat.classList.add('bestseller', 'available');
                } else {
                    seat.classList.add('available');
                }
                seat.addEventListener('click', () => {
                    if (seat.classList.contains('sold')) return;
                    seat.classList.toggle('selected');
                    if (seat.classList.contains('selected')) {
                        selectedSeats.push(seatId);
                        totalPrice += section === 'rs190' ? 190 : 60;
                    } else {
                        const index = selectedSeats.indexOf(seatId);
                        selectedSeats.splice(index, 1);
                        totalPrice -= section === 'rs190' ? 190 : 60;
                    }
                    updatePopup();
                });
                seatContainer.appendChild(seat);
            }
        });
    });
    
    const updatePopup = () => {
        const popup = document.getElementById('popup');
        const seatDisplay = document.getElementById('selectedSeats');
        const priceDisplay = document.getElementById('totalPrice');
        const confirmLink = document.getElementById('confirmBooking');
        seatDisplay.textContent = `Selected Seats: ${selectedSeats.join(', ') || 'None'}`;
        priceDisplay.textContent = `Total Price: ₹${totalPrice}`;
        popup.style.display = selectedSeats.length ? 'flex' : 'none';
        if (selectedSeats.length) {
            confirmLink.href = `payment.html?movieName=${encodeURIComponent(movieName)}&theatre=${encodeURIComponent(theatreName)}&seats=${encodeURIComponent(selectedSeats.join(','))}&price=${totalPrice}`;
            confirmLink.classList.remove('disabled');
        } else {
            confirmLink.href = "payment.html";
            confirmLink.classList.add('disabled');
        }
        document.getElementById('ticketSummary').textContent = `${selectedSeats.length} Tickets`;
    };
});
document.getElementById('confirmBooking').addEventListener('click', (e) => {
    e.preventDefault();
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.display = 'block';
    setTimeout(() => {
        window.location.href = e.target.href;
    }, 2000);
});

