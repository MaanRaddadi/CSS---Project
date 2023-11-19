let placeeame = document.getElementById("PlaceName");
let catagory = document.getElementById("catagory");
let service = document.getElementById("service");
let loclat = document.getElementById("loclat");
let loclung = document.getElementById("loclung");
let Reqs = document.getElementById("Reqs");

fetch("https://65587379e93ca47020a9592a.mockapi.io/Addplace")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data);
      let cata = data[i].service;
      Reqs.insertAdjacentHTML(
        "beforeend",
        `     <div>
            <p>Name: ${data[i].placeName}</p>
            <p>Catagory: ${data[i].catagory}</p>
            <ul>Services:
                <li>Toilets:${data[i].services.toilets}</li>
                <li>Parking:${data[i].services.parking} </li>
                <li>Ramps:${data[i].services.ramps}</li>
                <li>autoDoors:${data[i].services.autoDoors}</li>
                <li>tables:${data[i].services.tables}</li>
                <li>elevators:${data[i].services.elevators}</li>
                

            </ul>
            <p>location:
                <p>lat: ${data[i].loc.lat}</p>
                <p>lng: ${data[i].loc.lng}</p>
            </p>

            <button id="Acept">Accept</button>
            <button id="Deny">Deny</button>
             </div> `
      );

      let acpetbtn = document.getElementById("Acept");

      acpetbtn.addEventListener("click", () => {
        fetch("https://65575798bd4bcef8b6127831.mockapi.io/places", {
          method: "POST",
          body: JSON.stringify({
            placeName: data[i].placeName,
            location: data[i].loc,
            category: data[i].catagory,
            services: data[i].services,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
    }
  });
