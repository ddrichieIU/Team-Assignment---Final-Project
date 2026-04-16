document.addEventListener("DOMContentLoaded", async () => {
  await WatchlistStore.init();

  const trendingGrid = document.getElementById("trendingGrid");
  const popularGrid = document.getElementById("popularGrid");
  const homeLoading = document.getElementById("homeLoading");
  const homeError = document.getElementById("homeError");
  const popularLoading = document.getElementById("popularLoading");
  const popularError = document.getElementById("popularError");

  try {
    const trendingData = await TMDB.getTrendingMovies();
    renderMovieGrid(trendingGrid, trendingData.results.slice(0, 8), {
      saveButtonText: "Save",
      removeButtonText: "Remove"
    });
    homeLoading.classList.add("hidden");
  } catch (error) {
    homeLoading.classList.add("hidden");
    homeError.classList.remove("hidden");
    console.error(error);
  }

  try {
    const popularData = await TMDB.getPopularMovies();
    renderMovieGrid(popularGrid, popularData.results.slice(0, 8), {
      saveButtonText: "Save",
      removeButtonText: "Remove"
    });
    popularLoading.classList.add("hidden");
  } catch (error) {
    popularLoading.classList.add("hidden");
    popularError.classList.remove("hidden");
    console.error(error);
  }
});