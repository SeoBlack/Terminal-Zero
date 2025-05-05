var map = L.map('map-view').setView([62.505, 23], 13);


 L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=Q7LqsU4uCRpBRQmdA0wCfMBqoKmlramXUXl59KMEPYUzw4pdB7m4QLUATbSQwO92', {}).addTo(map);


 let  myIcon = L.divIcon({
     className: 'map-marker',
     html: ' <div class="marker-text">JFK</div><div class=" pulse-ring ">  </div>',
     iconSize: [50, 50],
     iconAnchor: [15, 15]
 });
  let  myIcon2 = L.divIcon({
     className: 'map-marker',
     html: ' <div class="marker-text">JFK</div><div class=" pulse-ring ">  </div>',
     iconSize: [50, 50],
     iconAnchor: [15, 15]
 });
   let  myIcon3 = L.divIcon({
     className: 'map-marker',
     html: ' <div class="marker-text">JFK</div><div class=" pulse-ring ">  </div>',
     iconSize: [50, 50],
     iconAnchor: [15, 15]
 });
    let  myIcon4 = L.divIcon({
     className: 'map-marker',
     html: ' <div class="marker-text">JFK</div><div class=" pulse-ring ">  </div>',
     iconSize: [50, 50],
     iconAnchor: [15, 15]
 });



 L.marker([62.505, 23], {
     icon: myIcon
 }).addTo(map).bindPopup('You are here!').openPopup();
    L.marker([59.436338803867166, 24.74853127076138], {
        icon: myIcon2
    }).addTo(map).bindPopup('You are here!').openPopup();
    L.marker([59.38502493119541, 18.06898918047692], {
        icon: myIcon3
    }).addTo(map).bindPopup('You are here!').openPopup();
    L.marker([59.96192708356162, 10.686176727785066], {
        icon: myIcon4
    }).addTo(map).bindPopup('You are here!').openPopup();
