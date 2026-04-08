const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const moviesDiv = document.getElementById("movies");
const loading = document.getElementById("loading");

let movies = [];

async function fetchMovies(query="batman") {
    loading.style.display = "block";

    const res = await fetch(`https://www.omdbapi.com/?apikey=93b43aed&s=${query}`);
    const data = await res.json();

    movies = data.Search || [];
    displayMovies();

    loading.style.display = "none";
}

function displayMovies() {
    let filtered = [...movies];


    if (filter.value !== "all") {
        filtered = filtered.filter(m => m.Type === filter.value);
    }


    if (sort.value === "asc") {
        filtered.sort((a,b) => a.Year - b.Year);
    } else if (sort.value === "desc") {
        filtered.sort((a,b) => b.Year - a.Year);
    }

    moviesDiv.innerHTML = filtered.map(movie => `
        <div class="card">
            <img src="${movie.Poster}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `).join("");
}


searchInput.addEventListener("input", (e) => {
    fetchMovies(e.target.value);
});

filter.addEventListener("change", displayMovies);
sort.addEventListener("change", displayMovies);

fetchMovies();
