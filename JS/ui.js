function cleanText(text) {
  if (text === null || text === undefined) {
    return "";
  }

  return String(text).replace(/"/g, "&quot;");
}

function getPosterUrl(path) {
  if (path) {
    return IMAGE_URL + path;
  }

  return "https://via.placeholder.com/300x450?text=No+Image";
}

function shortenText(text) {
  if (!text) {
    return "No description available.";
  }

  if (text.length > 100) {
    return text.substring(0, 100) + "...";
  }

  return text;
}

function getYear(dateText) {
  if (!dateText) {
    return "N/A";
  }

  return dateText.substring(0, 4);
}

function createMovieCard(movie, buttonType) {
  let buttonHtml = "";

  if (buttonType === "save") {
    buttonHtml =
      '<button class="btn btn-primary card-btn save-btn" ' +
      'data-id="' + movie.id + '" ' +
      'data-title="' + cleanText(movie.title) + '" ' +
      'data-poster="' + cleanText(movie.poster_path) + '" ' +
      'data-release="' + cleanText(movie.release_date) + '" ' +
      'data-rating="' + cleanText(movie.vote_average) + '" ' +
      '>Save</button>';
  }

  if (buttonType === "remove") {
    buttonHtml =
      '<button class="btn btn-outline card-btn remove-btn" data-id="' + movie.id + '">Remove</button>';
  }

  let card =
    '<article class="movie-card">' +
      '<a class="movie-poster-link" href="details.html?id=' + movie.id + '">' +
        '<img src="' + getPosterUrl(movie.poster_path) + '" alt="' + cleanText(movie.title) + '">' +
      '</a>' +
      '<div class="movie-body">' +
        '<h3 class="movie-title">' + movie.title + '</h3>' +
        '<p class="movie-meta">' + getYear(movie.release_date) + ' • Rating: ' + movie.vote_average + '</p>' +
        '<p class="movie-overview">' + shortenText(movie.overview) + '</p>' +
        '<div class="movie-actions">' +
          '<a class="btn btn-outline card-btn" href="details.html?id=' + movie.id + '">Details</a>' +
          buttonHtml +
        '</div>' +
      '</div>' +
    '</article>';

  return card;
}

function renderMovieCards(movies, gridId, buttonType) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    grid.innerHTML += createMovieCard(movies[i], buttonType);
  }
}

function connectSaveButtons() {
  const buttons = document.getElementsByClassName("save-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const movie = {
        id: this.dataset.id,
        title: this.dataset.title,
        poster_path: this.dataset.poster,
        release_date: this.dataset.release,
        vote_average: this.dataset.rating,
        overview: ""
      };

      saveMovieToWatchlist(movie);
      alert("Movie saved to watchlist.");
    });
  }
}

function connectRemoveButtons() {
  const buttons = document.getElementsByClassName("remove-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      removeMovieFromWatchlist(this.dataset.id);
      location.reload();
    });
  }
}