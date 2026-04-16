const LocalWatchlist = {
  key: "movieVaultWatchlist",

  getAll() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  },

  saveAll(movies) {
    localStorage.setItem(this.key, JSON.stringify(movies));
  },

  add(movie) {
    const current = this.getAll();
    const exists = current.some(item => item.id === movie.id);
    if (!exists) {
      current.push(movie);
      this.saveAll(current);
    }
  },

  remove(movieId) {
    const current = this.getAll().filter(item => item.id !== movieId);
    this.saveAll(current);
  },

  clear() {
    localStorage.removeItem(this.key);
  },

  isSaved(movieId) {
    return this.getAll().some(item => item.id === movieId);
  }
};

const FirebaseWatchlist = {
  initialized: false,

  async init() {
    if (!MOVIE_VAULT_CONFIG.firebase.enabled) return false;

    if (!window.firebase) {
      console.warn("Firebase SDK not loaded. Falling back to localStorage.");
      return false;
    }

    this.initialized = true;
    return true;
  },

  async getAll() {
    return LocalWatchlist.getAll();
  },

  async add(movie) {
    LocalWatchlist.add(movie);
  },

  async remove(movieId) {
    LocalWatchlist.remove(movieId);
  },

  async clear() {
    LocalWatchlist.clear();
  },

  async isSaved(movieId) {
    return LocalWatchlist.isSaved(movieId);
  }
};

const WatchlistStore = {
  async init() {
    return FirebaseWatchlist.init();
  },

  async getAll() {
    return FirebaseWatchlist.getAll();
  },

  async add(movie) {
    return FirebaseWatchlist.add(movie);
  },

  async remove(movieId) {
    return FirebaseWatchlist.remove(movieId);
  },

  async clear() {
    return FirebaseWatchlist.clear();
  },

  async isSaved(movieId) {
    return FirebaseWatchlist.isSaved(movieId);
  }
};