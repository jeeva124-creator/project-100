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
      if (show.id == selectedShowId) {
        movieDetails = show;
      }
    });

    if (movieDetails) {
      // console.log(movieDetails);
      movieHeading.textContent = movieDetails.title;







      

    } else {


      movieHeading.textContent = "No such movie"
      console.error(window.location.href="../../../error.html");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}
