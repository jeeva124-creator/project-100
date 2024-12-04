const theatersContainer = document.querySelector(".theaters"); 
const head = document.querySelector(".show-theaters");


fetch("/assets/data/theater.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((theater) => {
      const div = document.createElement("div");
      div.classList.add("theater");
      div.innerHTML = `
        <a href="../../../../Seat.html.html?id=${
          theater.id}&theatername=${encodeURIComponent(theater.theatername)}">
          <img src="${theater.img}" alt="${theater.theatername}">
          <h2>${theater.theatername}</h2>
          <button type="button" class="BookNow">View Seat</button> 
          
        </a>`
        ;
      head.append(div); 
    });
  })
  .catch((err) => {
    console.error("../../../error.html", err);
  });
document.addEventListener("DOMContentLoaded", () => {
  const dateButtonsContainer = document.getElementById("dateButtons");
  const confirmDateButton = document.getElementById("confirmDate");
  const selectedDateDisplay = document.getElementById("selectedDateDisplay");

  const today = new Date();
  const daysToShow = 7;

  let selectedDate = null;

  for (let i = 0; i < daysToShow; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const button = document.createElement("button");
    button.classList.add("date-button");
    button.textContent = date.toDateString();
    button.dataset.date = date.toISOString().split("T")[0];

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".date-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      selectedDate = button.dataset.date;
    });
    
    dateButtonsContainer.appendChild(button);
  }
  confirmDateButton.addEventListener("click", () => {
    if (selectedDate) {
      selectedDateDisplay.textContent = `You selected: ${new Date(selectedDate).toDateString()}`;
    } else {
      selectedDateDisplay.textContent = "Please select a date!";
    }
  });
});

