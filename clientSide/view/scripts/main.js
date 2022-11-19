// const { search } = require("../../../music-server/src/routes");
const serverUrl = "http://localhost:3000";
if (!sessionStorage.getItem("userSession")) {
  window.location.replace("./loginPage.html");
}

let playListSongs = [];
let currentSongId = 0;
let errorMessages = "";

window.onload = function () {
  document.getElementById("forSearch").onclick = searchItem;
  init();
  musicList();
  myPlayList();
};

function showButton() {
  let buttonsSpan = document.getElementById("buttons");
  let playType = sessionStorage.getItem("playType");
  buttonsSpan.innerHTML = "";
  if (playType === "ORDER") {
    buttonsSpan.insertAdjacentHTML(
      "beforeend",
      `<button onclick="shuffleSongs()" id="shuffle"><i class="fa fa-random" aria-hidden="true"></i></button>`
    );
  } else if (playType === "SHUFFLE") {
    buttonsSpan.insertAdjacentHTML(
      "beforeend",
      `<button onclick="repeatSongs()" id="repeat"><i class="fa fa-solid fa-repeat"></i></button>`
    );
  } else if (playType === "REPEAT") {
    buttonsSpan.insertAdjacentHTML(
      "beforeend",
      `<button onclick="orderSongs()" id="repeatOne"><i class="fa fa-solid fa-arrow-right"></i></button>`
    );
  }
  buttonsSpan.insertAdjacentHTML("beforeend", `Mode: ${playType}`);
}
//init
function init() {
  let username = document.getElementById("userName");
  document.getElementById("logoutBtn").onclick = logout;
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  username.innerText = "Welcome " + userSession.username;
  let nextBtn = document.getElementById("next");
  nextBtn.onclick = playNext;
  let previousBtn = document.getElementById("previous");
  previousBtn.onclick = playPrevious;
  showButton();
}

//load all music data from music server
function musicList(searchText) {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  let musicListTable = document.getElementById("tableBody");
  musicListTable.innerHTML = "";

  let playDiv = document.getElementById("musicPLay");
  let url = "http://localhost:3000/api/music";

  if (searchText) {
    url += `?search=${searchText}`;
  }
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userSession.accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      let data = await response.json();
      if (response.ok) {
        data.forEach((element, index) => {
          musicListTable.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <td>${index + 1}</td>
            <td>${element.title}</td>
            <td>${element.releaseDate}</td>
            <td><button onclick="addToPlayList('${
              element.id
            }')"><i class="fa fa-solid fa-plus"></button></i></td>
          </tr>`
          );
        });
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
//load myPlayList
function myPlayList() {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  fetch("http://localhost:3000/api/playlist", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userSession.accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      let data = await response.json();
      if (response.ok) {
        playListSongs = data;
        createPlayListTable();
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
//create playlist table
function createPlayListTable() {
  let playList = document.getElementById("playListBody");
  playList.innerHTML = "";
  playListSongs.forEach((item, index) => {
    // let nextBtnId =
    //   index + 1 === data.length ? "play-" + 1 : "play-" + (index + 2);
    // let previousBtnId = index === 0 ? "play-" + data.length : "play-" + index;
    playList.insertAdjacentHTML(
      "beforeend",
      `<tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>
             <button id="play-${index + 1}" onclick='playSong("${
        item.title
      }","${item.urlPath}", "${index}") '>
                <i class="fa fa-solid fa-play"></i></button>
             <button type='submit' onclick='removeFromPlayList("${
               item.songId
             }")'><i class="fa fa-minus" aria-hidden="true"></i></button>
            </td>
          </tr>`
    );
  });
}
//adding to the playlist
function addToPlayList(songID) {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  fetch("http://localhost:3000/api/playlist/add", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${userSession.accessToken}`,
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      songId: songID,
    }),
  })
    .then(async (response) => {
      let data = await response.json();
      if (response.ok) {
        playListSongs = data;
        createPlayListTable();
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
//logout user
function logout() {
  sessionStorage.removeItem("userSession");
  sessionStorage.removeItem("playType");
  location.href = "loginPage.html";
}
//search music
function searchItem() {
  let searchValue = document.getElementById("searchPlaceHolder").value;
  musicList(searchValue);
}

function removeFromPlayList(songId) {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  fetch("http://localhost:3000/api/playlist/remove", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: `Bearer ${userSession.accessToken}`,
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      songId: songId,
    }),
  })
    .then(async (response) => {
      let data = await response.json();
      if (response.ok) {
        playListSongs = data;
        createPlayListTable();
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function playSong(title, urlPath, orderId) {
  currentSongId = orderId;
  let audioDiv = document.getElementById("audio");
  // let songTitleDiv = document.getElementById("songTitle");
  // songTitleDiv.innerHTML = "";
  audioDiv.innerHTML = "";
  let span = document.getElementById("titleText");
  span.innerHTML = title + "...";
  let audio = document.createElement("audio");
  audio.style = "width:75%";
  audio.setAttribute("controls", "");
  audio.innerHTML = `<source src="${serverUrl}/${urlPath}" type="audio/mpeg">`;
  audio.onended = function () {
    playNext("onendedevent");
  };
  audioDiv.append(audio);
  // songTitleDiv.append(span);
  audio.play();
  showButton();
}

function playNext(param) {
  let nextSongId;

  if (sessionStorage.getItem("playType") === "ORDER") {
    if (currentSongId == playListSongs.length - 1) {
      nextSongId = 0;
    } else {
      nextSongId = +currentSongId + 1;
    }
  } else if (sessionStorage.getItem("playType") === "SHUFFLE") {
    nextSongId = getRandomInt(0, playListSongs.length - 1);
  } else if (sessionStorage.getItem("playType") === "REPEAT") {
    if (param == "onendedevent") {
      nextSongId = currentSongId;
    } else {
      if (currentSongId == playListSongs.length - 1) {
        nextSongId = 0;
      } else {
        nextSongId = +currentSongId + 1;
      }
    }
  }
  console.log(nextSongId);
  let nextSong = playListSongs[nextSongId];
  playSong(nextSong.title, nextSong.urlPath, nextSongId);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}

function playPrevious() {
  let previousSongId;
  if (sessionStorage.getItem("playType") === "ORDER") {
    if (currentSongId == 0) {
      previousSongId = playListSongs.length - 1;
    } else {
      previousSongId = +currentSongId - 1;
    }
  } else if (sessionStorage.getItem("playType") === "SHUFFLE") {
    previousSongId = getRandomInt(0, playListSongs.length - 1);
  } else if (sessionStorage.getItem("playType") === "REPEAT") {
    if (currentSongId == 0) {
      previousSongId = playListSongs.length - 1;
    } else {
      previousSongId = +currentSongId - 1;
    }
  }
  let nextSong = playListSongs[previousSongId];
  playSong(nextSong.title, nextSong.urlPath, previousSongId);
}

function shuffleSongs() {
  sessionStorage.setItem("playType", "SHUFFLE");
  showButton();
}

function repeatSongs() {
  sessionStorage.setItem("playType", "REPEAT");
  showButton();
}

function orderSongs() {
  sessionStorage.setItem("playType", "ORDER");
  showButton();
}
