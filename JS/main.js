const trendingGrid = document.getElementById("trendingGrid");
const popularGrid = document.getElementById("popularGrid");
const homeLoading = document.getElementById("homeLoading");
const homeError = document.getElementById("homeError");
const popularLoading = document.getElementById("popularLoading");
const popularError = document.getElementById("popularError");

async function loadHomePage() {
  if (!trendingGrid || !popularGrid) {
    return;
  }

  try {
    const trendingMovies = await getTrendingMovies();
    renderMovieCards(trendingMovies.slice(0, 8), "trendingGrid", "save");
    connectSaveButtons();
    homeLoading.classList.add("hidden");
  } catch (error) {
    homeLoading.classList.add("hidden");
    homeError.classList.remove("hidden");
  }

  try {
    const popularMovies = await getPopularMovies();
    renderMovieCards(popularMovies.slice(0, 8), "popularGrid", "save");
    connectSaveButtons();
    popularLoading.classList.add("hidden");
  } catch (error) {
    popularLoading.classList.add("hidden");
    popularError.classList.remove("hidden");
  }
}

loadHomePage();