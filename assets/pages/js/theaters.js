const theatersContainer = document.querySelector(".theaters");
const head = document.querySelector(".show-theaters");
const dateselection = document.querySelector(".date-selection");

// Fetch theater data
fetch("/assets/data/theater.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((theater) => {
      const div = document.createElement("div");
      div.classList.add("theater");
      div.innerHTML = `
        <img src="${theater.img}" alt="${theater.theatername}">
        <h2>${theater.theatername}</h2>
        <a href="../../../../&moviename=${theater.name}/Seat.html?id=${
          theater.id
        }&theatername=${encodeURIComponent(theater.theatername)}">
         <button type="button" class="BookNow">07:15</button>
          <button type="button" class="BookNow">04:15</button>
        </a>
      `;

      head.append(div);
    });

    // Fetch movie details
 
  })
  
    //  date

document.addEventListener("DOMContentLoaded", () => {
  const dateButtonsContainer = document.getElementById("dateButtons");
  const confirmDateButton = document.getElementById("confirmDate");
  const selectedDateDisplay = document.getElementById("selectedDateDisplay");

  const today = new Date();
  const daysToShow = 7;
  let selectedDate = null;
console.log(today);


  for (let i = 0; i < daysToShow; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
console.log(date)
    const button = document.createElement("button");
    button.classList.add("date-button");
    button.textContent = date.toDateString();
    button.dataset.date = date.toISOString().split("T")[0];
    button.addEventListener("click", (e) => {
      e.preventDefault
      document.querySelectorAll(".date-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      selectedDate = button.dataset.date;
    });

    dateButtonsContainer.appendChild(button);
  }

confirmDateButton.addEventListener("click", (e) => {
  e.preventDefault()
    if (selectedDate) {
      selectedDateDisplay.textContent = `You selected: ${new Date(
        selectedDate
      ).toDateString()}`;
    } else {
      console.error("No date selected!");
      
    }
  })
})

   // urlParams
const Languages=document.getElementsByClassName("Languages")
const queryString = window.location.search;
console.log("url is :" + queryString);

const urlParams = new URLSearchParams(queryString); // class
const selectedShowId = urlParams.get("id");

console.log("id : " + selectedShowId);


const movieName = urlParams.get("moviename");
console.log("movieName :" + movieName);

moviefhow();

const  moviename=document.querySelector(".movieName")
console.log(moviename);
async function  moviefhow() {
  

try {
  const response = await fetch("/assets/data/movies.json");
  const data = await response.json();

  let movieDetails;
  data.forEach((show) => {
    if (show.id == selectedShowId ) {
      movieDetails = show;
    }
  });
  if (movieDetails) {
    
    moviename.innerHTML = 
   `
  <h2>${movieDetails.name}</h2>
  <P>${movieDetails.category}</p> `}

}
catch (error) {
  // console.error("Error fetching movie details:", error);
}
}

