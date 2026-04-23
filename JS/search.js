const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");
const searchResultsGrid = document.getElementById("searchResultsGrid");
const clearSearchBtn = document.getElementById("clearSearchBtn");

async function searchForMovies() {
  const title = searchInput.value.trim();

  if (title === "") {
    searchStatus.textContent = "Please enter a movie title.";
    searchResultsGrid.innerHTML = "";
    return;
  }

  searchStatus.textContent = "Loading movies...";
  searchResultsGrid.innerHTML = "";

  try {
    const movies = await searchMoviesByTitle(title);

    if (movies.length === 0) {
      searchStatus.textContent = 'No movies found for "' + title + '".';
      return;
    }

    searchStatus.textContent = movies.length + " movie(s) found.";
    renderMovieCards(movies, "searchResultsGrid", "save");
    connectSaveButtons();
  } catch (error) {
    searchStatus.textContent = "Something went wrong loading movies.";
  }
}

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchForMovies();
  });
}

if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchStatus.textContent = "Search for a movie to get started.";
    searchResultsGrid.innerHTML = "";
  });
}