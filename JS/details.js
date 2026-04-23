const detailsPoster = document.getElementById("detailsPoster");
const detailsTagline = document.getElementById("detailsTagline");
const detailsTitle = document.getElementById("detailsTitle");
const detailsMeta = document.getElementById("detailsMeta");
const detailsOverview = document.getElementById("detailsOverview");
const detailsGenres = document.getElementById("detailsGenres");
const detailsFacts = document.getElementById("detailsFacts");
const saveMovieBtn = document.getElementById("saveMovieBtn");
const detailsError = document.getElementById("detailsError");
const detailsHero = document.getElementById("detailsHero");

function getMovieIdFromUrl() {
  let query = window.location.search.substring(1);
  let parts = query.split("&");

  for (let i = 0; i < parts.length; i++) {
    let pair = parts[i].split("=");
    if (pair[0] === "id") {
      return pair[1];
    }
  }

  return null;
}

async function loadDetailsPage() {
  if (!detailsTitle) {
    return;
  }

  const movieId = getMovieIdFromUrl();

  if (movieId === null) {
    detailsError.classList.remove("hidden");
    return;
  }

  try {
    const movie = await getMovieDetailsById(movieId);

    detailsPoster.innerHTML =
      '<img src="' + getPosterUrl(movie.poster_path) + '" alt="' + cleanText(movie.title) + '">';

    detailsTagline.textContent = movie.tagline || "Movie Details";
    detailsTitle.textContent = movie.title;
    detailsOverview.textContent = movie.overview || "No description available.";

    detailsMeta.innerHTML =
      '<span class="meta-chip">Rating: ' + movie.vote_average + '</span>' +
      '<span class="meta-chip">Release: ' + movie.release_date + '</span>' +
      '<span class="meta-chip">Runtime: ' + movie.runtime + ' min</span>';

    detailsGenres.innerHTML = "";
    for (let i = 0; i < movie.genres.length; i++) {
      detailsGenres.innerHTML += '<span class="tag">' + movie.genres[i].name + '</span>';
    }

    detailsFacts.innerHTML =
      '<li>Status: ' + movie.status + '</li>' +
      '<li>Original Language: ' + movie.original_language + '</li>' +
      '<li>Popularity: ' + movie.popularity + '</li>';

    if (movie.backdrop_path) {
      detailsHero.style.background =
        'linear-gradient(rgba(3, 7, 13, 0.7), rgba(3, 7, 13, 0.95)), url("https://image.tmdb.org/t/p/original' +
        movie.backdrop_path +
        '") center/cover no-repeat';
    }

    saveMovieBtn.addEventListener("click", function () {
      const simpleMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview
      };

      saveMovieToWatchlist(simpleMovie);
      alert("Movie saved to watchlist.");
    });
  } catch (error) {
    detailsError.classList.remove("hidden");
  }
}

loadDetailsPage();