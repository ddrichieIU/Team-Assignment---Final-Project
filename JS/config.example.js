const MOVIE_VAULT_CONFIG = {
  tmdb: {
    apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzczMTA1NDVlYTVmMzY3YTVmMzk0MzlkZDdkNTFkMiIsIm5iZiI6MTc3NjM0MDU3Ni45NTI5OTk4LCJzdWIiOiI2OWUwY2U2MDY1NDQ3NzVlNjBhZjk4YWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NnLa_nCN_Bs3tdfpTukh8hcRawPDKYO0ATMr_v7_ONo",
    baseUrl: "https://api.themoviedb.org/3",
    imageBase: "https://image.tmdb.org/t/p/w500",
    backdropBase: "https://image.tmdb.org/t/p/original"
  },
  firebase: {
    enabled: false,
    config: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    }
  }
};