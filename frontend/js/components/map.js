import { Icons } from "./icons.js";
import {playSoundEffect, soundEffects} from "./sound_effects.js";
import {showConfirmationDialog} from "./confirmation_dialog.js";

class MapHandler {
    constructor(player = null ) {
        this.map = L.map("map-view", {
            minZoom: 5,
            maxZoom: 7,
        });
        this.markers = [];
        this.player = player
        this.playerMarker = null;
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
            html: `<div class="pulse-ring player-ring"></div><div class="player player-icon" style="color:${player.color}">${Icons.PLAYER[player.iconIndex]}</div>`,
            iconSize: [50, 50],
            iconAnchor: [12.5, 12.5],
            popupAnchor: [0, -12.5],
            rotationOrigin: 'center',

        });

        let popup = this.createPlayerPopup(player);
        this.playerMarker = L.marker([player.location.lat, player.location.lng], {
            icon: playerIcon
        }).addTo(this.map).bindPopup(popup);


        this.markers.push(this.playerMarker);
    }

    createMapMarker(airport) {
        const iconSize = airport.isExplored ? 40 : 25 * airport.dangerLevel;
        const imageUrl = airport.isExplored ? `../../assets/images/explored-airport.png` : `../../assets/images/airport-marker.png`;
        const airportIcon = L.divIcon({
            className: 'airport-marker',
            html: `<div class="airport-icon" style="background-image: url('${imageUrl}')"></div>`,
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
                <button class="transparent-button travel-button">Travel to destination</button>
            `);
        popup.on('add', () => {
            const travelButton = popup.getElement().querySelector('.travel-button');
            if (travelButton) {
                travelButton.addEventListener('click', async () => {
                    playSoundEffect(soundEffects.CLICK)
                    if(this.player){
                       await  this.player.move(airport,this.playerMarker )
                        this.updateMap(this.player);


                    }
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