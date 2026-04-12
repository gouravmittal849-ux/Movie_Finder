const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const moviesDiv = document.getElementById("movies");
const loading = document.getElementById("loading");

let movies = [];

async function fetchMovies(query = "batman") {
    try {
        loading.style.display = "block";

        const res = await fetch(`https://www.omdbapi.com/?apikey=93b43aed&s=${query}`);
        const data = await res.json();

        if (data.Response === "False") {
            movies = [];
            moviesDiv.innerHTML = `<p>No movies found</p>`;
        } else {
            movies = data.Search;
            displayMovies();
        }

    } catch (error) {
        moviesDiv.innerHTML = `<p>Error fetching data</p>`;
    } finally {
        loading.style.display = "none";
    }
}

function displayMovies() {
    let filtered = [...movies];

    if (filter.value !== "all") {
        filtered = filtered.filter(m => m.Type === filter.value);
    }

    if (sort.value === "asc") {
        filtered.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (sort.value === "desc") {
        filtered.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }

    if (filtered.length === 0) {
        moviesDiv.innerHTML = `<p>No results after filtering</p>`;
        return;
    }

    moviesDiv.innerHTML = filtered.map(movie => `
        <div class="card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `).join("");
}

let timeout;

searchInput.addEventListener("input", (e) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        fetchMovies(e.target.value || "batman");
    }, 500);
});

filter.addEventListener("change", displayMovies);
sort.addEventListener("change", displayMovies);

fetchMovies();
