function getWatchlist() {
  let movies = localStorage.getItem("movieVaultWatchlist");

  if (movies === null) {
    return [];
  }

  return JSON.parse(movies);
}

function saveMovieToWatchlist(movie) {
  let watchlist = getWatchlist();
  let alreadySaved = false;

  for (let i = 0; i < watchlist.length; i++) {
    if (String(watchlist[i].id) === String(movie.id)) {
      alreadySaved = true;
    }
  }

  if (alreadySaved === false) {
    watchlist.push(movie);
    localStorage.setItem("movieVaultWatchlist", JSON.stringify(watchlist));
  }
}

function removeMovieFromWatchlist(id) {
  let watchlist = getWatchlist();
  let updatedWatchlist = [];

  for (let i = 0; i < watchlist.length; i++) {
    if (String(watchlist[i].id) !== String(id)) {
      updatedWatchlist.push(watchlist[i]);
    }
  }

  localStorage.setItem("movieVaultWatchlist", JSON.stringify(updatedWatchlist));
}

function clearWatchlist() {
  localStorage.removeItem("movieVaultWatchlist");
}

function isMovieInWatchlist(id) {
  let watchlist = getWatchlist();

  for (let i = 0; i < watchlist.length; i++) {
    if (String(watchlist[i].id) === String(id)) {
      return true;
    }
  }

  return false;
}