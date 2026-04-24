const firebaseConfig = {
  apiKey: "AIzaSyA1234jX4Ar0ak0NvDimt0wPSX5eAWxwLs",
  authDomain: "teamprojectfinal-7d25d.firebaseapp.com",
  databaseURL: "https://teamprojectfinal-7d25d-default-rtdb.firebaseio.com/",
  projectId: "teamprojectfinal-7d25d",
  storageBucket: "teamprojectfinal-7d25d.firebasestorage.app",
  messagingSenderId: "994082332296",
  appId: "1:994082332296:web:5280735b5d7fbca662c93d",
  measurementId: "G-J9TNL2J28T"
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