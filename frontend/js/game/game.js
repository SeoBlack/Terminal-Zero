import {getAirports} from "../utils/backend-queries.js";
import Player from "./player.js";
import Airport from "./airport.js";
import {getHintEvents} from "./helpers.js";
import {SETTINGS} from "./settings.js";
import MapHandler from "../components/map.js";
import {animateScan} from "../components/animations.js";

export default class Game {
    constructor(playerName) {
        /** Initialize game settings and player state. */
        this.gameOver = false;
        this.player = new Player(playerName, this.updateUI.bind(this));
        this.airports = []; // List of the available airports to travel to
        this.startTime = new Date();
        this.endTime = null;
        this.hasWon = false;
        this.map = new MapHandler('map-view')


    }

    updateMap() {
        /** Update the map with the player's current location and airports in range. */
        this.map.updateMap(this.player);
    }
    async getAirports() {
        /** Create object for each airport to give us access to each of them. */
        const dbAirports = await getAirports();
        dbAirports.forEach(airport => {
            //id, name, lat, lng, country,
            this.airports.push(new Airport(airport.id, airport.name, parseFloat(airport.latitude_deg), parseFloat(airport.longitude_deg), airport.country));
        });

        // Make a random airport as the safe one
        const randomAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
        randomAirport.isSafe = true;
    }

    async initiateGame() {
        /** Initialize the game. */
        await this.getAirports();
        this.player.location = this.airports[Math.floor(Math.random() * this.airports.length)]; // Get a random airport
        this.generateRandomHint();
        this.updateMap()
        this.updateUI();
    }

    handleExploreLocation() {
        if (this.checkWin()) {
            return;
        }

        // Loop through the events of the airport
        this.player.location.isExplored = true;
        if (this.player.location.events.length === 0) {
            displayWarningMessage("There are no resources available in this location.");
            this.checkLose();
            return;
        }

        this.player.location.events.forEach(event => {
            event.applyEvent(this.player);
            this.checkLose();
        });
    }

    handleInventory() {
        displayInventory(this.player.inventory);
    }

    handleGameOver() {
        this.gameOver = true;
    }

    handleUse() {
        displayInventory(this.player.inventory);
        const itemId = prompt("Enter item Name:");
        if (itemId.length === 0) {
            return;
        } else {
            this.player.inventory.useItem(itemId, this.player);
        }
    }

    generateRandomHint() {
        const safeAirport = this.airports.find(airport => airport.isSafe);
        if (safeAirport) {
            const hintEvents = getHintEvents(safeAirport.country);
            const randomAirports = Array.from({ length: SETTINGS.max_survivor_encounter }, () =>
                this.airports[Math.floor(Math.random() * this.airports.length)]
            );

            randomAirports.forEach(airport => {
                airport.events.push(new Event(hintEvents[Math.floor(Math.random() * hintEvents.length)], { survivor: 0 }));
            });
        }
    }


    checkWin() {
        if (this.player.location.isSafe) {
            // Win case
            displayWinScreen(this.player);
            this.endGame(true);
            return true;
        } else {
            return false;
        }
    }

    checkLose() {
        if (
            (this.player.fuel <= 0 && !this.hasWon && this.player.inventory.items.fuel === 0 && this.player.location.isExplored) ||
            (this.player.health <= 0 && !this.hasWon)
        ) {
            displayLoseScreen();
            this.endGame(false);
        }
    }

    endGame(hasWon = false) {
        this.hasWon = hasWon;
        this.handleGameOver();
        this.endTime = new Date();
        const completionTime = (this.endTime - this.startTime) / 1000; // Time in seconds
        this.dbManager.createNewGameRecord(this.player.id, formatTime(completionTime), this.hasWon);
        const recordsList = this.dbManager.getEndStatus();
        displayRecords(recordsList);
    }
    async scanAirports() {
        //run animation
        await animateScan()
        this.player.airportsInRange = this.airports.filter(airport =>
            airport.calculateDistance(this.player.location) < SETTINGS.max_distance_km &&
            airport !== this.player.location
        );
        this.updateMap()
    }
    updateUI() {
        /** Update the UI with the current game state. */
        document.querySelector('#player-name').innerText = this.player.name;
        document.querySelector('#player-health-number').innerText = `${this.player.health}%`;
        document.querySelector('#player-health-bar').style.width = `${this.player.health}%`;
        document.querySelector('#player-fuel-number').innerText = `${this.player.fuel}%`;
        document.querySelector('#player-fuel-bar').style.width = `${this.player.fuel / 5}%`;
        document.querySelector('#player-location').innerText = this.player.location.name;
        // document.querySelector('#player-inventory').innerText = player.inventory.getItems().join(', ');
}
}