const key = "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0";
let userLatitude;
let userLongitude;
let currentUser;
let isSingedIn = false;
let isAdmin = false;

if (localStorage.length > 0) {
  if (localStorage.getItem("admin") !== null) {
    currentUser = JSON.parse(localStorage.getItem("admin"));
    document.getElementById(
      "welcomeMsg"
    ).innerText = `اهلا بك, ${currentUser.UserName}`;
    document.getElementById("signInLink").innerText = "";
    isAdmin = true;
    isSingedIn = true;
  } else {
    currentUser = JSON.parse(localStorage.getItem("userinfo"));
    document.getElementById(
      "welcomeMsg"
    ).innerText = `اهلا بك, ${currentUser.UserName}`;
    document.getElementById("signInLink").innerText = "";
    isSingedIn = true;
  }
}
console.log(isAdmin);
// Initialize and add the map
let map;
let canvas = new bootstrap.Offcanvas(
  document.getElementById("offcanvasScrollingRight")
);
const rightOffcanvas = document.getElementById("offcanvasScrollingRight");
const ratingModal = new bootstrap.Modal(document.getElementById("ratingModal"));
const signInModal = new bootstrap.Modal(document.getElementById("signIn"));
const leftOffCanvas = new bootstrap.Offcanvas(
  document.getElementById("leftOffcanvas")
);
const leftOffCanvasBtn = document.getElementById("leftOffCanvasBtn");
async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 24.71331255305661, lng: 46.673044536003 },
    mapId: "a128fd791f572fa9",
  });

  generateMarkers();
}

const getPlaceData = async () => {
  try {
    const response = await fetch(
      "https://65575798bd4bcef8b6127831.mockapi.io/places"
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(`status : ${error}`);
  }
};

function generateMarkers() {
  getPlaceData().then((data) => {
    for (const d of data) {
      if (d.category === "منتزه") {
        const marker = new google.maps.Marker({
          position: { lat: d.location.lat, lng: d.location.lng },
          map: map,
          icon: "assets/pins/ParkPin.svg",
        });

        marker.addListener("click", () => {
          map.setZoom(16);
          map.setCenter(marker.getPosition());
          fillRightCanvas(d.id);
        });
      } else if (d.category === "مطعم") {
        const marker = new google.maps.Marker({
          position: { lat: d.location.lat, lng: d.location.lng },
          map: map,
          icon: "./assets/pins/ResturantPin.svg",
        });
        marker.addListener("click", () => {
          map.setZoom(16);
          map.setCenter(marker.getPosition());
          fillRightCanvas(d.id);
        });
      } else if (d.category === "فندق") {
        const marker = new google.maps.Marker({
          position: { lat: d.location.lat, lng: d.location.lng },
          map: map,
          icon: "assets/pins/HotelPin.svg",
        });
        marker.addListener("click", () => {
          map.setZoom(16);
          map.setCenter(marker.getPosition());
          fillRightCanvas(d.id);
        });
      }
    }
  });
}
const ratingBtn = document.getElementById("addRatingBtn");
function fillRightCanvas(id) {
  let placeName = document.getElementById("placeName");
  let canvaHeaderImg = document.getElementById("canvaHeaderImg");
  let serviceImg = document.querySelectorAll(".service-img");
  let distanceText = document.querySelector(".distance");
  let directionsLink = document.getElementById("directions-link");
  fetch("https://65575798bd4bcef8b6127831.mockapi.io/places/" + id)
    .then((response) => response.json())
    .then((placeData) => {
      placeName.innerText = placeData.placeName;
      canvaHeaderImg.src = placeData.placeImages.img;
      placeData.services.toilets === true
        ? (serviceImg[0].src = "../assets/services/WC.svg")
        : (serviceImg[0].src = "../assets/services/WCDisabled.svg");
      placeData.services.parking === true
        ? (serviceImg[1].src = "../assets/services/Parking.svg")
        : (serviceImg[1].src = "../assets/services/ParkingDisabled.svg");
      placeData.services.ramps === true
        ? (serviceImg[2].src = "../assets/services/Ramp.svg")
        : (serviceImg[2].src = "../assets/services/RampDisabled.svg");
      placeData.services.autoDoors === true
        ? (serviceImg[3].src = "../assets/services/Doors.svg")
        : (serviceImg[3].src = "../assets/services/DoorsDisabled.svg");
      placeData.services.tables === true
        ? (serviceImg[4].src = "../assets/services/Resturant.svg")
        : (serviceImg[4].src = "../assets/services/ResturantDisabled.svg");
      placeData.services.elevators === true
        ? (serviceImg[5].src = "../assets/services/Elevator_.svg")
        : (serviceImg[5].src = "../assets/services/Elevator.svg");

      directionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${placeData.location.lat},${placeData.location.lng}`;

      calculateDistanceFromUserLocation(
        placeData.location.lat,
        placeData.location.lng,
        (distance) => {
          if (distance !== null) {
            distanceText.innerText = distance.toFixed(2) + " km";
          } else {
            console.log("Unable to calculate distance.");
          }
        }
      );

      ratingBtn.addEventListener(
        "click",
        () => {
          if (isSingedIn === false) {
            signInModal.show();
          } else {
            postRating(id);
          }
        },
        {
          once: true,
        }
      );
      getRatings(id);

      let firstImgGroup = document.querySelector(".image-group1");
      let secondImgGroup = document.querySelector(".image-group3");

      firstImgGroup.style.backgroundImage = `url(${placeData.placeImages.img2})`;
      secondImgGroup.style.backgroundImage = `url(${placeData.placeImages.img3})`;
    });

  canvas.toggle();
}
leftOffCanvasBtn.addEventListener("click", fillLeftOffCanvas);
if (isAdmin) {
  document.querySelector(".list-group").insertAdjacentHTML(
    "beforeend",
    ` <a
  href="./pages/PlaceReq.html"
  class="list-group-item list-group-item-action fs-6 fw-bold text-decoration-none"
  ><i class="bi bi-clipboard-check text-dark p-2"></i>إدارة الطلبات</a>`
  );
}
function fillLeftOffCanvas() {
  if (isSingedIn === false) {
    signInModal.show();
  } else {
    document.querySelector(".user-name").innerText = currentUser.UserName;
    leftOffCanvas.toggle();
  }
}

async function postRating(id) {
  ratingModal.show();
  const sendRatingBtn = document.getElementById("sendRatingBtn");
  sendRatingBtn.addEventListener(
    "click",
    async () => {
      let commentText = document.getElementById("floatingTextarea2").value;
      if (commentText === "") {
        document
          .getElementById("floatingTextarea2")
          .insertAdjacentHTML("afterend", `<small>اكتب تعليقك اولا</small>`);
      } else {
        console.log(id);
        try {
          await fetch("https://655895c4e93ca47020a97c19.mockapi.io/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser.id,
              placeId: id,
              commentBody: commentText,
              ratingValue: "",
            }),
          });
          ratingModal.hide();
        } catch (error) {
          document
            .getElementById("floatingTextarea2")
            .insertAdjacentHTML("afterend", `<small>${error}</small>`);
        }
      }
    },
    {
      once: true,
    }
  );
}

async function getRatings(id) {
  const ratingContainer = document.querySelector(".rating-container");
  try {
    const response = await fetch(
      "https://655895c4e93ca47020a97c19.mockapi.io/comments"
    );
    const comments = await response.json();

    let commentsByPlace = comments.filter((comment) => comment.placeId == id);
    if (commentsByPlace.length === 0) {
      ratingContainer.innerHTML = "";
      ratingContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="text-center">لا توجد تعليقات</p>`
      );
    } else {
      ratingContainer.innerHTML = "";
      for (const comment of commentsByPlace) {
        let res = await fetch(
          "https://65575798bd4bcef8b6127831.mockapi.io/users/" + comment.userId
        );
        let userData = await res.json();
        ratingContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="rating-row container d-flex align-items-start">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
          class="img-fluid pfp mt-2"
        />
    
        <div class="container d-flex flex-column">
          <p class="fw-bold username m-0">${userData.userName}</p>
          <div class="container p-0">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          <p class="fw-bold rating-text">
    ${comment.commentBody}
          </p>
        </div>
      </div>
      <hr class="w-100" />`
        );
      }
    }
  } catch (error) {
    console.log(`Comment Status : ${error}`);
  }
}

function openDircetions(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, "_blank");
}
function calculateDistanceFromUserLocation(lat, lon, callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;

      const distance = calculateDistance(userLatitude, userLongitude, lat, lon);
      callback(distance);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    callback(null);
  }
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

document.getElementById("signOutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

initMap();
