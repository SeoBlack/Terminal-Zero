import {createEndResult, getAirports} from "../utils/backend-queries.js";
import Player, {jsonifyPlayer} from "./player.js";
import Airport, {jsonifyAirport} from "./airport.js";
import {formatTime, getHintEvents} from "./helpers.js";
import {SETTINGS} from "./settings.js";
import MapHandler from "../components/map.js";
import {animateLose, animateScan, animateSearch, animateWin} from "../components/animations.js";
import {showSnackbar, snackbarType} from "../components/snackbar.js";
import Event, {jsonifyEvent} from "./events.js";
import {updateInventoryUI, updateStatusUI, updateUI} from "../components/ui_handler.js";
import {playSoundEffect, soundEffects} from "../components/sound_effects.js";
import {saveCurrentGame} from "../components/localstorage.js";
import Inventory from "./inventory.js";
import {showInformationDialog} from "../components/information_dialog.js";
import {getWeatherData} from "../components/openWeatherMap.js";

export default class Game {
    constructor(gameOver = false, player = null, airports = [], startTime = null, endTime = null, hasWon = false, map = null) {
        /** Initialize game settings and player state. */
        this.gameOver = gameOver;
        this.player = player || new Player();
        this.airports = airports;
        this.startTime = startTime || Date.now();
        this.endTime = endTime;
        this.hasWon = hasWon;
        this.map = map || new MapHandler(this.player);
        this.checker = setInterval(async () => {
            if (!this.player.location || !this.player.location.calculateDistance || typeof this.player.location.calculateDistance !== 'function')
                return;
            await this.checkLose();
            await this.checkWin();
        }, 1000);
        // this.updateMap();
        this.player.updateUi = () => {
            this.updateUI()
        }

    }

    updateMap() {
        /** Update the map with the player's current location and airports in range. */
        this.map.updateMap(this.player);
    }
    async getAirports() {
        /** Create object for each airport to give us access to each of them. */
        const dbAirports = await getAirports();
        for (let i = 0; i < dbAirports.length; i++) {
            const airport = dbAirports[i];
             const weatherData = await getWeatherData(parseFloat(airport.latitude_deg), parseFloat(airport.longitude_deg));
            this.airports.push(new Airport(airport.id, airport.name,null, Math.floor(Math.random() * SETTINGS.max_danger_level) + 1 ,  parseFloat(airport.latitude_deg), parseFloat(airport.longitude_deg), airport.country, false, false, weatherData));

        }

        // Make a random airport as the safe one
        const randomAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
        randomAirport.isSafe = true;
    }

    async initiateGame() {
        /** Initialize the game. */
        await this.getAirports();
        this.player.location = this.airports[Math.floor(Math.random() * this.airports.length)]; // Get a random airport
        this.generateRandomHint();
        this.updateUI();
        this.updateMap();
        this.handleSave();
        //check if the game is over every second


    }

    async handleExploreLocation() {
        await getWeatherData(this.player.location.lat, this.player.location.lng);
        animateSearch();
        if (await this.checkWin()) {
            return;
        }

        // Loop through the events of the airport
        this.player.location.isExplored = true;
        if (this.player.location.events.length === 0) {
            playSoundEffect(soundEffects.ERROR)
            showSnackbar(snackbarType.ERROR, "Nothing to explore here");
            await this.checkLose();
            return;
        }
       for (let i = 0; i < this.player.location.events.length; i++) {
            await this.checkWin()
            await this.checkLose();
            if(!this.gameOver) {
                const event = this.player.location.events[i];
                setTimeout(() => {
                    event.applyEvent(this.player);
                    this.updateUI();
                }, 1500* i); // Incremental delay
                // Check if the game is over after each event

            }
            else{
                break;

            }
        }
        this.player.location.events = []; // Clear the events after exploring
        this.updateUI();
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


    async checkWin() {
        if (this.player.location.isSafe && this.player.location.isExplored) {
            // Win case
            await this.endGame(true);
            return true;
        } else {
            return false;
        }
    }

    async checkLose() {
        //get nearest airport

        const nearestAirport = this.airports.reduce((closest, airport) => {
            // skip the current airport if it's the same as the player's location
            if (airport === this.player.location) {
                return closest;
            }

            const closestDist = this.player.location.calculateDistance(closest);
            const currDist = this.player.location.calculateDistance(airport);
            return (closestDist < currDist) ? closest : airport;

        }
        );

        //check if player's fuel is enough to reach the nearest airport
        const distanceToNearestAirport = this.player.location.calculateDistance(nearestAirport);
        const fuelNeeded = distanceToNearestAirport / SETTINGS.fuel_usage_per_km
        //check if player has enough fuel to reach the nearest airport
        if((this.player.fuel <= 0 || this.player.fuel < fuelNeeded) && (this.player.inventory.items.fuel === 0 || !Object.keys(this.player.inventory.items).includes('fuel')) && this.player.location.isExplored) {
            await this.endGame(false);
        }
        else if(this.player.health <= 0 && !this.hasWon){
            await this.endGame(false);
        }
    }

    async endGame(hasWon = false) {
        this.hasWon = hasWon;
        this.gameOver = true;
        this.endTime = Date.now();
        clearInterval(this.checker);
        const completionTime = this.endTime - this.startTime;
        try{
            const response = await createEndResult(this.player.name, formatTime(completionTime), this.hasWon );
            this.handleSave()
        }
        catch(error){
            console.error("error", error);
            showSnackbar(snackbarType.ERROR, 'An error occurred while saving the game');
        }
        if (this.hasWon) {
            await animateWin();

            window.location.href = `../winning_screen/win_screen.html`;
        }else{
            const deathReason = this.player.health <= 0 ? "You were eaten by zombies" : "You have run out of fuel";
            await animateLose(deathReason);
            showInformationDialog("Game Over", "You have lost the game! Better luck next time!");
            window.location.href = `../losing_screen/lose_screen.html`;


        }

    }
    async scanAirports() {
        //run animation
        await animateScan()
        this.player.airportsInRange = this.airports.filter(airport =>
            airport.calculateDistance(this.player.location) < SETTINGS.max_distance_km  &&
            airport !== this.player.location
        );
        this.updateMap()
    }
    updateUI() {
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
    const airports = json.airports.map(airport => new Airport(airport.id, airport.name, airport.events.map(event => new Event(event.description, event.effect)), airport.dangerLevel, airport.lat, airport.lng, airport.country, airport.isExplored, airport.isSafe, airport.weather));
    const player = new Player(json.player.id, json.player.name, json.player.health, json.player.fuel, airports.find(airport => airport.id === json.player.location), new Inventory(json.player.inventory.items), airports.filter(airport => json.player.airportsInRange.includes(airport.id)), json.player.color, null, json.player.iconIndex, json.player.weather);

    const map = new MapHandler(player);
    return new Promise((resolve, reject) => {
        const game = new Game(json.gameOver, player, airports, json.startTime, json.endTime, json.hasWon, map);
        game.updateUI();
        game.updateMap();
        resolve(game);
    });
}