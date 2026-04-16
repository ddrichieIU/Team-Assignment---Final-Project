document.addEventListener("DOMContentLoaded", async () => {
  await WatchlistStore.init();

  const grid = document.getElementById("watchlistGrid");
  const status = document.getElementById("watchlistStatus");
  const clearBtn = document.getElementById("clearWatchlistBtn");

  async function loadWatchlist() {
    const movies = await WatchlistStore.getAll();
    grid.innerHTML = "";

    if (!movies.length) {
      status.textContent = "Your watchlist is empty.";
      return;
    }

    status.textContent = `${movies.length} saved movie(s).`;

    movies.forEach(movie => {
      const card = createMovieCard(movie, {
        saveButtonText: "Save",
        removeButtonText: "Remove"
      });

      const toggleBtn = card.querySelector(".save-toggle-btn");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", async () => {
          setTimeout(loadWatchlist, 50);
        });
      }

      grid.appendChild(card);
    });
  }

  clearBtn.addEventListener("click", async () => {
    await WatchlistStore.clear();
    loadWatchlist();
  });

  loadWatchlist();
});