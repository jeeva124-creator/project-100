const queryString = window.location.search;
console.log("url is :" + queryString);

const urlParams = new URLSearchParams(queryString); // class
const selectedShowId = urlParams.get("id");

console.log("id : " + selectedShowId);


const movieName = urlParams.get("movieName");
console.log("movieName :" + movieName);

let movieHeading = document.getElementsByClassName("movie_heading")[0];

console.log(movieHeading);

setMovieDetails();

async function setMovieDetails() {

  try {
    const response = await fetch("/assets/data/movie_details.json");
    const data = await response.json();


    let movieDetails;
    data.forEach((show) => {
      if (show.id == selectedShowId ) {
        movieDetails = show;
      }
    });
   
    if (movieDetails) {
   
    document.body.innerHTML=  
    `
     <header>

     <div class="title">
         <h1>${movieDetails.title}</h1>
         <p>${movieDetails.RunTime}</p>
     </div>
   <a href=../../../theaters.html?id=${movieDetails.id}&moviename=${movieDetails.title} <button type="button" class="View-All-shows">View All shows</button> </a>
     </div>
 </header>
 <section>

     <div class="movie_trailer">
         <iframe src="${movieDetails.trailer}"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerpolicy="strict-origin-when-cross-orign" allowfullscreen></iframe>
     </div>

 </section>

 <section class="movie-type" >
     <div>
         <div class="movie-det">
             <h4>Director:</h4>
             <p>${movieDetails.Director}</p>
         </div class="movie-about">
         <div class="movie-det">
             <h4>Rating:</h4>
             <p>${movieDetails.Rating}</p>
         </div>
         <div class="movie-det">
             <h4>Languages:</h4>
             <p>${movieDetails.Languages}</p>
         </div>
         <div class="movie-det">
             <h4>Release Date:</h4>
             <p>${movieDetails.ReleaseDate}</p>
         </div>
         <div class="movie-det">
             <h4>Run Time: </h4>
             <p>${movieDetails.RunTime}</p>
         </div>
     </div>
 </section>
 <Section>
 <div class="Sunopsis">
     <h2>About </h2>
     <p>
     ${movieDetails.Sunopsis}
 </p>
 </div>
</Section class="topcast">
<h2>Top Cast</h2>
 <div class="top-cast">
    
     <div class="leade">

         <img src="${movieDetails["lead-img"]}"
             alt="${movieDetails.title}">
         <p>${movieDetails["TopCast-lead"]}</p>
     </div>
     
     <div class="sup">
         <img src="${movieDetails["sub-img"]}"
             alt="${movieDetails["sub-name"]}">
         <p>${movieDetails["sub-name"]}</p>
     </div>
 </div>

`
   }
    else {
      movieHeading.textContent = "No such movie"
      console.error(window.location.href="../../../error.html");
    }
  } 
  catch (error) {
    console.error("Error fetching movie details:", error);
  }
}
