const moviesDiv = document.getElementById("movies");
const loading = document.getElementById("loading");

async function fetchMovies() {
    loading.style.display = "block";

    const res = await fetch("https://www.omdbapi.com/?apikey=564727fa&s=batman");
    const data = await res.json();

    loading.style.display = "none";

    moviesDiv.innerHTML = data.Search.map(movie => `
        <div class="card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `).join("");
}

fetchMovies();
