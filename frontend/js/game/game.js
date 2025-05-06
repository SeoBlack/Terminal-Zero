import {getAirports} from "../utils/backend-queries.js";
import Player, {jsonifyPlayer} from "./player.js";
import Airport, {jsonifyAirport} from "./airport.js";
import {getHintEvents} from "./helpers.js";
import {SETTINGS} from "./settings.js";
import MapHandler from "../components/map.js";
import {animateScan, animateSearch} from "../components/animations.js";
import {showSnackbar, snackbarType} from "../components/snackbar.js";
import Event, {jsonifyEvent} from "./events.js";
import {updateInventoryUI, updateStatusUI, updateUI} from "../components/ui_handler.js";
import {playSoundEffect, soundEffects} from "../components/sound_effects.js";
import {saveCurrentGame} from "../components/localstorage.js";
import Inventory from "./inventory.js";

export default class Game {
    constructor(gameOver = false, player = null, airports = [], startTime = null, endTime = null, hasWon = false, map = null) {
        /** Initialize game settings and player state. */
        this.gameOver = gameOver;
        this.player = player || new Player();
        this.airports = airports;
        this.startTime = startTime || new Date();
        this.endTime = endTime;
        this.hasWon = hasWon;
        this.map = map || new MapHandler(this.player);
        // this.updateMap();
        console.log(this.airports)
        this.player.updateUi = () => {
            this.updateUI()
        }

    }

    updateMap() {
        /** Update the map with the player's current location and airports in range. */
        console.log(this.player)
        this.map.updateMap(this.player);
    }
    async getAirports() {
        /** Create object for each airport to give us access to each of them. */
        const dbAirports = await getAirports();
        dbAirports.forEach(airport => {
            //id, name, lat, lng, country,
            this.airports.push(new Airport(airport.id, airport.name,null, Math.floor(Math.random() * SETTINGS.max_danger_level) + 1 ,  parseFloat(airport.latitude_deg), parseFloat(airport.longitude_deg), airport.country));
        });

        // Make a random airport as the safe one
        const randomAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
        randomAirport.isSafe = true;
    }

    async initiateGame() {
        /** Initialize the game. */
        await this.getAirports();
        console.log(this.airports);
        this.player.location = this.airports[Math.floor(Math.random() * this.airports.length)]; // Get a random airport
        this.generateRandomHint();
        this.updateUI();
        this.updateMap();
        this.handleSave()

    }

    handleExploreLocation() {
        animateSearch();
        if (this.checkWin()) {
            return;
        }

        // Loop through the events of the airport
        this.player.location.isExplored = true;
        if (this.player.location.events.length === 0) {
            playSoundEffect(soundEffects.ERROR)
            showSnackbar(snackbarType.ERROR, "Nothing to explore here");
            this.checkLose();
            return;
        }
        console.log(this.player.location.events);
       for (let i = 0; i < this.player.location.events.length; i++) {
            const event = this.player.location.events[i];
            setTimeout(() => {
                event.applyEvent(this.player);
                this.updateUI();
            }, 1500* i); // Incremental delay
        }
        this.player.location.events = []; // Clear the events after exploring
        this.updateUI();
    }


    handleGameOver() {
        this.gameOver = true;
    }

    generateRandomHint() {
        const safeAirport = this.airports.find(airport => airport.isSafe);
        console.log(safeAirport);
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
            // displayWinScreen(this.player);
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
            // displayLoseScreen();
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
        console.log("PLAYER INSIDE GAME", this.player)
        updateUI(this.player);

    }
    handleSave(){
        saveCurrentGame(this)
    }
}


export function jsonifyGame(game) {
    return {
        player: jsonifyPlayer(game.player),
        airports: game.airports.map(airport => jsonifyAirport(airport)),
        startTime: game.startTime,
        endTime: game.endTime,
        hasWon: game.hasWon,
        gameOver: game.gameOver,
    }
}

export function gamifyJson(json) {
    const airports = json.airports.map(airport => new Airport(airport.id, airport.name, airport.events.map(event => new Event(event.description, event.effect)), airport.dangerLevel, airport.lat, airport.lng, airport.country, airport.isExplored, airport.isSafe));

    const player = new Player(json.player.id, json.player.name, json.player.health, json.player.fuel, airports.find(airport => airport.id === json.player.location), new Inventory(json.player.inventory.items), airports.filter(airport => json.player.airportsInRange.includes(airport.id)), json.player.color, null, json.player.iconIndex);

    const map = new MapHandler(player);
    return new Promise((resolve, reject) => {
        const game = new Game(json.gameOver, player, airports, json.startTime, json.endTime, json.hasWon, map);
        game.updateUI();
        game.updateMap();
        resolve(game);
    });
}