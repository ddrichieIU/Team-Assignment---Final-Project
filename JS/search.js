document.addEventListener("DOMContentLoaded", async () => {
  await WatchlistStore.init();

  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const grid = document.getElementById("searchResultsGrid");
  const status = document.getElementById("searchStatus");
  const clearBtn = document.getElementById("clearSearchBtn");

  async function runSearch(query) {
    if (!query.trim()) {
      status.textContent = "Type a movie title to search.";
      grid.innerHTML = "";
      return;
    }

    status.textContent = "Searching...";
    grid.innerHTML = "";

    try {
      const data = await TMDB.searchMovies(query);
      const movies = data.results || [];

      if (!movies.length) {
        status.textContent = "No results found.";
        return;
      }

      status.textContent = `${movies.length} result(s) found.`;
      renderMovieGrid(grid, movies, {
        saveButtonText: "Save",
        removeButtonText: "Remove"
      });
    } catch (error) {
      status.textContent = "Search failed.";
      console.error(error);
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    runSearch(input.value);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    grid.innerHTML = "";
    status.textContent = "Search for a movie to get started.";
  });

  const queryParam = getQueryParam("query");
  if (queryParam) {
    input.value = queryParam;
    runSearch(queryParam);
  }
});