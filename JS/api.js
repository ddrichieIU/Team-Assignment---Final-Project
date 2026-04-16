const TMDB = {
  async request(endpoint) {
    const url = `${MOVIE_VAULT_CONFIG.tmdb.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${MOVIE_VAULT_CONFIG.tmdb.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    return response.json();
  },

  async getTrendingMovies() {
    return this.request("/trending/movie/week?language=en-US");
  },

  async getPopularMovies() {
    return this.request("/movie/popular?language=en-US&page=1");
  },

  async searchMovies(query) {
    return this.request(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  },

  async getMovieDetails(movieId) {
    return this.request(`/movie/${movieId}?language=en-US`);
  },

  async getGenres() {
    return this.request("/genre/movie/list?language=en");
  },

  getPosterUrl(path) {
    if (!path) return "https://via.placeholder.com/500x750/0f1724/9eb6d8?text=No+Poster";
    return `${MOVIE_VAULT_CONFIG.tmdb.imageBase}${path}`;
  },

  getBackdropUrl(path) {
    if (!path) return "";
    return `${MOVIE_VAULT_CONFIG.tmdb.backdropBase}${path}`;
  }
};