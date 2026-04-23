const firebaseConfig = {
  apiKey: "PASTE_YOURS_HERE",
  authDomain: "PASTE_YOURS_HERE",
  databaseURL: "PASTE_YOURS_HERE",
  projectId: "PASTE_YOURS_HERE",
  storageBucket: "PASTE_YOURS_HERE",
  messagingSenderId: "PASTE_YOURS_HERE",
  appId: "PASTE_YOURS_HERE"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function getUserId() {
  let userId = localStorage.getItem("movieVaultUserId");

  if (userId === null) {
    userId = "user_" + Date.now();
    localStorage.setItem("movieVaultUserId", userId);
  }

  return userId;
}

function getWatchlist(callback) {
  const userId = getUserId();

  database.ref("watchlists/" + userId).once("value", function(snapshot) {
    const data = snapshot.val();

    if (data === null) {
      callback([]);
      return;
    }

    const movies = [];

    for (let id in data) {
      movies.push(data[id]);
    }

    callback(movies);
  });
}

function saveMovieToWatchlist(movie) {
  const userId = getUserId();

  database.ref("watchlists/" + userId + "/" + movie.id).set(movie);
}

function removeMovieFromWatchlist(id) {
  const userId = getUserId();

  database.ref("watchlists/" + userId + "/" + id).remove();
}

function clearWatchlist(callback) {
  const userId = getUserId();

  database.ref("watchlists/" + userId).remove(function() {
    if (callback) {
      callback();
    }
  });
}