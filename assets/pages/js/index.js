const searchBar = document.querySelector(".search-input"); 
const head = document.querySelector(".movies-flux");

let movies = []; 


fetch("/assets/data/movies.json")
  .then((res) => res.json())
  .then((data) => {
    movies = data.map((show) => {
      const div = document.createElement("div");
      div.classList.add("movie-container"); 
      div.innerHTML = `
        <a href="../../../movie_details.html?id=${show.id}&movieName=${show.name}" class="moviecard">
          <img src="${show.img}" alt="${show.name}">
          <h3>${show.name}</h3> 
          <p>${show.category}</p>
          <button class="show">Book Ticket</button>
        </a>`;
      
      head.append(div); 
      return {
        name: show.name.toLowerCase(), 
        img: show.img,
        category: show.category,
        element: div, 
      };
    });
  })
  .catch((error) => console.error("Failed to fetch movies:", error)); 

searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase(); 

  movies.forEach((movie) => {
    const isVisible = movie.name.includes(value); 
    movie.element.style.display = isVisible ? "block" : "none";
  
  });
});
