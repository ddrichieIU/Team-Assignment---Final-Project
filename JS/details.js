document.addEventListener("DOMContentLoaded", async () => {
  await WatchlistStore.init();

  const movieId = getQueryParam("id");
  const titleEl = document.getElementById("detailsTitle");
  const taglineEl = document.getElementById("detailsTagline");
  const metaEl = document.getElementById("detailsMeta");
  const overviewEl = document.getElementById("detailsOverview");
  const genresEl = document.getElementById("detailsGenres");
  const factsEl = document.getElementById("detailsFacts");
  const posterEl = document.getElementById("detailsPoster");
  const heroBackdrop = document.querySelector(".details-backdrop");
  const saveBtn = document.getElementById("saveMovieBtn");
  const errorEl = document.getElementById("detailsError");

  if (!movieId) {
    errorEl.classList.remove("hidden");
    titleEl.textContent = "Movie not found.";
    return;
  }

  try {
    const movie = await TMDB.getMovieDetails(movieId);

    document.title = `Movie Vault | ${movie.title}`;
    titleEl.textContent = movie.title;
    taglineEl.textContent = movie.tagline || "Movie Details";
    overviewEl.textContent = movie.overview || "No overview available.";

    posterEl.innerHTML = `
      <img src="${TMDB.getPosterUrl(movie.poster_path)}" alt="${movie.title}" />
    `;

    const backdrop = TMDB.getBackdropUrl(movie.backdrop_path);
    if (backdrop) {
      heroBackdrop.style.backgroundImage = `url('${backdrop}')`;
    }

    metaEl.innerHTML = `
      <span class="meta-chip">${formatYear(movie.release_date)}</span>
      <span class="meta-chip">${formatRating(movie.vote_average)}</span>
      <span class="meta-chip">${movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}</span>
    `;

    genresEl.innerHTML = "";
    (movie.genres || []).forEach(genre => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = genre.name;
      genresEl.appendChild(tag);
    });

    factsEl.innerHTML = `
      <li><strong>Release Date:</strong> ${movie.release_date || "N/A"}</li>
      <li><strong>Original Language:</strong> ${movie.original_language?.toUpperCase() || "N/A"}</li>
      <li><strong>Vote Count:</strong> ${movie.vote_count ?? "N/A"}</li>
      <li><strong>Status:</strong> ${movie.status || "N/A"}</li>
      <li><strong>Popularity:</strong> ${movie.popularity ?? "N/A"}</li>
    `;

    const updateButton = async () => {
      const saved = await WatchlistStore.isSaved(movie.id);
      saveBtn.textContent = saved ? "Remove from Watchlist" : "Save to Watchlist";
    };

    await updateButton();

    saveBtn.addEventListener("click", async () => {
      const movieToSave = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview
      };

      const saved = await WatchlistStore.isSaved(movie.id);

      if (saved) {
        await WatchlistStore.remove(movie.id);
      } else {
        await WatchlistStore.add(movieToSave);
      }

      await updateButton();
    });
  } catch (error) {
    console.error(error);
    errorEl.classList.remove("hidden");
    titleEl.textContent = "Movie not found.";
  }
});