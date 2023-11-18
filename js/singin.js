let username = document.getElementById("username");
let pass = document.getElementById("pass");
let singinBTN = document.getElementById("singinBTN");
let error = document.getElementById("error");
singinBTN.addEventListener("click", () => {
  fetch("https://65587379e93ca47020a9592a.mockapi.io/usersinfo")
    .then((res) => res.json())
    .then((data) => {
      let userinfo = data.find(
        (InfoDB) =>
          username.value === InfoDB.UserName && pass.value === InfoDB.Password
      );

      if (!userinfo) {
        error.innerText = "name or password is invailed";
      } else {
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
        window.location.href = "../index.html";
      }
    });
});
