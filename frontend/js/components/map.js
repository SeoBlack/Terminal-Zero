import { Icons } from "./icons.js";

class MapHandler {
    constructor(mapId) {
        this.map = L.map(mapId);
        this.markers = [];
        this.player = null;
        L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=Q7LqsU4uCRpBRQmdA0wCfMBqoKmlramXUXl59KMEPYUzw4pdB7m4QLUATbSQwO92', {}).addTo(this.map);
    }

    updateMap(player) {
        this.player = player;
        this.clearMap();
        this.map.setView([player.location.lat, player.location.lng], 5);
        player.airportsInRange.forEach(airport => {
            this.createMapMarker(airport);
        });
        this.createPlayerMarker(player);
    }

    createPlayerMarker(player) {
        let playerIcon = L.divIcon({
            className: 'player-marker',
            html: `<div class="pulse-ring" id="player"></div><div class="player" style="color:${player.color}">${Icons.PLAYER}</div>`,
            iconSize: [50, 50],
            iconAnchor: [12.5, 12.5],
            popupAnchor: [0, -12.5],
            rotationOrigin: 'center',

        });

        let popup = this.createPlayerPopup(player);
        const playerMarker = L.marker([player.location.lat, player.location.lng], {
            icon: playerIcon
        }).addTo(this.map).bindPopup(popup);


        this.markers.push(playerMarker);
    }

    createMapMarker(airport) {
        const iconSize = 25 * airport.dangerLevel;
        const airportIcon = L.divIcon({
            className: 'airport-marker',
            html: `<div class="airport-icon"></div>`,
            iconSize: [iconSize, iconSize],
            iconAnchor: [12.5, 12.5],
            popupAnchor: [0, -12.5],
            rotationOrigin: 'center'
        });

        let popup = this.createAirportPopup(airport);

        const marker = L.marker([airport.lat, airport.lng], {
            icon: airportIcon
        }).addTo(this.map).bindPopup(popup);
        this.markers.push(marker);
    }

    clearMap() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
    }

    createAirportPopup(airport) {
        let popup = L.popup()
            .setLatLng([airport.lat, airport.lng])
            .setContent(`
                <h2>${airport.name}</h2>
                <p><strong>Country: </strong> ${airport.country}</p>
                <p><strong>Danger Level:</strong> ${airport.dangerLevel}</p>
                <button class="transparent-button" id="travel-button">Travel to destination</button>
            `);
        popup.on('add', () => {
            const travelButton = document.getElementById('travel-button');
            if (travelButton) {
                travelButton.addEventListener('click', async () => {
                    if(this.player){
                        const playerMarker = this.markers.find(marker => marker.getLatLng().lat === this.player.location.lat && marker.getLatLng().lng === this.player.location.lng);
                       await  this.player.move(airport,playerMarker )
                        this.updateMap(this.player);

                    }

                    // Add your travel logic here
                });
            }
        });
        return popup;
    }

    createPlayerPopup(player) {
        let popup = L.popup()
            .setLatLng([player.location.lat, player.location.lng])
            .setContent(`
                <h2>${player.name}</h2>
                <p><strong>Location: </strong> ${player.location.name}</p>
                <p><strong>Danger Level:</strong> ${player.location.dangerLevel}</p>
            `);
        return popup;
    }
}

export default MapHandler;