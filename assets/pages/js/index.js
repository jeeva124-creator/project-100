

const searchBar=document.querySelector(".search-bar")


const head = document.querySelector(".movies-flux");

fetch("/assets/data/movies.json") 
    .then(res => res.json())
    .then(data => {
        
    movie=data.map(show => {
            const div = document.createElement("div");
            div.classList.add("movies-flux");
            div.innerHTML = `<a href="../../../movie_details.html?id=${show.id}&movieName=${show.name}" class="moviecard" >
            <img src="${show.img}" alt="${show.name}">
                <h3>${show.name}</h3> 
                <p>${show.category}</p>  <button class="show">Book Ticket</button></a>`;
           
            head.append(div);
        });
    })
  let movie =[];
    searchBar.addEventListener("input",(e)=>{
      const value=e.target.value
      console.log(value)
    })
