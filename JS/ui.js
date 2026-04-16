function formatYear(dateString) {
  if (!dateString) return "Unknown";
  return dateString.split("-")[0];
}

function formatRating(voteAverage) {
  if (voteAverage === undefined || voteAverage === null) return "N/A";
  return `${Number(voteAverage).toFixed(1)}/10`;
}

function trimText(text, maxLength = 120) {
  if (!text) return "No description available.";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function createMovieCard(movie, options = {}) {
  const {
    showSaveButton = true,
    saveButtonText = "Save",
    removeButtonText = "Remove"
  } = options;

  const card = document.createElement("article");
  card.className = "movie-card";

  const isSaved = LocalWatchlist.isSaved(movie.id);

  card.innerHTML = `
    <a class="movie-poster-link" href="details.html?id=${movie.id}">
      <img src="${TMDB.getPosterUrl(movie.poster_path)}" alt="${movie.title}" />
    </a>
    <div class="movie-body">
      <div class="movie-title">${movie.title}</div>
      <div class="movie-meta">
        <span>${formatYear(movie.release_date)}</span>
        <span>${formatRating(movie.vote_average)}</span>
      </div>
      <div class="movie-overview">${trimText(movie.overview, 110)}</div>
      <div class="movie-actions">
        <a href="details.html?id=${movie.id}" class="btn btn-outline card-btn">Details</a>
        ${
          showSaveButton
            ? `<button class="btn btn-primary card-btn save-toggle-btn" data-id="${movie.id}">
                ${isSaved ? removeButtonText : saveButtonText}
              </button>`
            : ""
        }
      </div>
    </div>
  `;

  if (showSaveButton) {
    const button = card.querySelector(".save-toggle-btn");
    button.addEventListener("click", async () => {
      if (LocalWatchlist.isSaved(movie.id)) {
        await WatchlistStore.remove(movie.id);
        button.textContent = saveButtonText;
      } else {
        await WatchlistStore.add(movie);
        button.textContent = removeButtonText;
      }
    });
  }

  return card;
}

function renderMovieGrid(container, movies, options = {}) {
  container.innerHTML = "";
  movies.forEach(movie => {
    container.appendChild(createMovieCard(movie, options));
  });
}

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}