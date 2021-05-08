// API Keys and links
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=65646db72b3ea126da5a9f54222bde62&result";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=65646db72b3ea126da5a9f54222bde62&query="';

// DOM Selections
const form = document.getElementById("form");
const main = document.getElementById("main");
var data = [];
var rr = 3,
  rl = 4;
getMovies(API_URL);

form.addEventListener("submit", (e) => {
  // Prevents form Submission
  e.preventDefault();
  rr = 3;
  rl = 4;
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

window.addEventListener("resize", () => {
  rr = 3;
  rl = 4;
  showMovies(data);
});

// Fumctions
async function getMovies(url) {
  const res1 = await fetch(url + "&page=1");
  const data1 = await res1.json();
  console.log("DATA 1:", data1, "width");
  const res2 = await fetch(url + "&page=2");
  const data2 = await res2.json();
  data = [...data1.results, ...data2.results];
  console.log("DATA 2:", data2, "size", data.length);

  showMovies(data);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie, index) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    if (index % 9 === 0 && index > 0 && window.screen.width > 1300) {
      console.log("rr", rr - 2, "to", rr);
      movieEl.style.setProperty("grid-column", `4/6`);
      movieEl.style.setProperty("grid-row", `${rr - 2} / ${rr}`);
      rr = rr + 3;
    } else if (index % 9 === 1 && index > 2 && window.screen.width > 1300) {
      console.log("rl", rl - 2, "to", rl);
      movieEl.style.setProperty("grid-column", `1/3`);
      movieEl.style.setProperty("grid-row", `${rl - 2} / ${rl}`);
      rl = rl + 2;
    }
    movieEl.innerHTML = `
      <img
        src="${IMG_PATH + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByVote(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
      `;
    main.appendChild(movieEl);
  });
}

function getClassByVote(vote) {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else if (vote >= 2.5) {
    return "orange";
  } else {
    return "red";
  }
}
