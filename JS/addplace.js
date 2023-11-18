let parks = document.getElementById("park")
let elevators = document.getElementById("elevators")
let movingDoors = document.getElementById("movingDoors")
let clve = document.getElementById("clve")
let bathrooms = document.getElementById("bathrooms")
let addBTN = document.getElementById("addBTN")
let placeeame = document.getElementById("placeName")
let tables = document.getElementById("tables")
let map;

async function initMap() {

  
    
// The start location 
  const position = { lat: 24.71331255305661, lng: 46.673044536003};

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
       
    });
}
    let isFirst = 1
    function placeMarkerAndPanTo(latLng, map) {

        if (isFirst == 1){
            new google.maps.Marker({
            
                position: latLng,
                map: map,
              });
              map.panTo(latLng);

              isFirst =  3

              addBTN.addEventListener("click",()=>{

                let type = document.getElementById("typee")
                let lat = latLng.lat();
                let lng = latLng.lng();
                
                let loc = {lat,lng}

                let catagory = type.value
                let placeName = placeeame.value
                var services={
                "toilets": bathrooms.checked,
                "parking":parks.checked,
                "ramps":clve.checked,
                "autoDoors":movingDoors.checked,
                "tables":tables.checked,
                "elevators":elevators.checked}
                
               

                fetch("https://65587379e93ca47020a9592a.mockapi.io/Addplace", {
                    method:"POST",
                    body: JSON.stringify({
                        placeName,
                        loc,  
                        catagory,
                        services
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                })
                .then(res => res.json())
                .then(data => {})
            
            })
        }
  }



window.initMap = initMap();