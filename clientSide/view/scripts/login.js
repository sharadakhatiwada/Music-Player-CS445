window.onload = function () {
  let login = document.getElementById("loginBtn");
  login.onclick = clickLogin;
};
function clickLogin(event) {
  console.log("Hello");
  event.preventDefault();
  let userName = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let data = {
    username: userName,
    password: password,
  };
  fetch("http://localhost:3000/api/auth/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(async (response) => {
      let body = await response.json();
      if (response.status !== 200) {
        throw new Error(body.message);
      } else {
        sessionStorage.setItem("userSession", JSON.stringify(body));
        sessionStorage.setItem("playType", body.playType);
        window.location.replace("./main.html");
      }
    })
    .catch((error) => {
      let spanMsg = document.getElementById("errorHandelling");
      spanMsg.innerHTML = error;
    });
}
