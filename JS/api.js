async function fetchData(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Request failed: " + response.status);
  }

  const data = await response.json();
  return data;
}

async function getTrendingMovies() {
  const url = BASE_URL + "/trending/movie/week";
  const data = await fetchData(url);
  return data.results;
}

async function getPopularMovies() {
  const url = BASE_URL + "/movie/popular";
  const data = await fetchData(url);
  return data.results;
}

async function searchMoviesByTitle(title) {
  const url = BASE_URL + "/search/movie?query=" + encodeURIComponent(title);
  const data = await fetchData(url);
  return data.results;
}

async function getMovieDetailsById(id) {
  const url = BASE_URL + "/movie/" + id;
  const data = await fetchData(url);
  return data;
}