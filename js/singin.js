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
        error.innerText = "name or password is invalid";
      } else {
        if (checkIfAdmin(userinfo)) {
          localStorage.setItem("admin", JSON.stringify(userinfo));
          window.location.href = "../index.html";
        } else {
          localStorage.setItem("userinfo", JSON.stringify(userinfo));
          window.location.href = "../index.html";
        }
      }
    });
});

const admins = [
  {
    username: "admin",
    password: "Admin@123",
  },
  {
    username: "admin2",
    password: "admin@123",
  },
];
function checkIfAdmin(user) {
  console.log(user);
  for (let i = 0; i < admins.length; i++) {
    if (
      admins[i].username === user.UserName &&
      admins[i].password === user.Password
    ) {
      return true;
    }
  }
}
