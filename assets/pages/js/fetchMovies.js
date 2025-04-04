async function fetchMovies() {
    try {
        const response = await fetch("http://localhost:8080/movies"); // Adjust URL if needed
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json();
        
        console.log("Movies List:", movies); // Log data to console
        
        // Render movies to the page
        renderMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function renderMovies(movies) {
    const container = document.getElementById("moviesContainer"); 
    container.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-item");
        movieDiv.innerHTML = `
            <h2>${movie.name}</h2>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Language:</strong> ${movie.language}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
        `;
        container.appendChild(movieDiv);
    });
}

// Call function when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies);
