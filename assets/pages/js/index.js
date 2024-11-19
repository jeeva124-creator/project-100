


const head = document.querySelector(".movie-list");

fetch("/assets/data/movies.json") 
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(show => {
            const div = document.createElement("div");
            div.classList.add("movie-item");
            div.innerHTML = `<a href="../../../movie_details.html?id=${show.id}&movieName=${show.name}" >
            <img src="${show.img}" alt="${show.name}">
                <h3>${show.name}</h3> 
                <p>${show.category}</p>  </a>`;
            head.append(div);
          
        });
    })
   

    
