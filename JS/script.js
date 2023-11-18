const key = "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0";
let userLatitude;
let userLongitude;
// Initialize and add the map
let map;
let canvas = new bootstrap.Offcanvas(
  document.getElementById("offcanvasScrollingRight")
);
const rightOffcanvas = document.getElementById("offcanvasScrollingRight");
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
          icon: "../assets/pins/ParkPin.svg",
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
          icon: "../assets/pins/ResturantPin.svg",
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
          icon: "../assets/pins/HotelPin.svg",
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

async function fillRightCanvas(id) {
  let placeName = document.getElementById("placeName");
  let canvaHeaderImg = document.getElementById("canvaHeaderImg");
  let serviceImg = document.querySelectorAll(".service-img");
  let distanceText = document.querySelector(".distance");
  let directionsLink = document.getElementById("directions-link");
  const response = await fetch(
    "https://65575798bd4bcef8b6127831.mockapi.io/places/" + id
  );
  const placeData = await response.json();

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

  canvas.toggle();
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

initMap();
