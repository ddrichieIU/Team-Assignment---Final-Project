const watchlistGrid = document.getElementById("watchlistGrid");
const watchlistStatus = document.getElementById("watchlistStatus");
const clearWatchlistBtn = document.getElementById("clearWatchlistBtn");

function loadWatchlistPage() {
  if (!watchlistGrid) {
    return;
  }

  let watchlist = getWatchlist();

  if (watchlist.length === 0) {
    watchlistStatus.textContent = "Your watchlist is empty.";
    watchlistGrid.innerHTML = "";
    return;
  }

  watchlistStatus.textContent = "Saved movies:";
  renderMovieCards(watchlist, "watchlistGrid", "remove");
  connectRemoveButtons();
}

if (clearWatchlistBtn) {
  clearWatchlistBtn.addEventListener("click", function () {
    clearWatchlist();
    loadWatchlistPage();
  });
}

loadWatchlistPage();