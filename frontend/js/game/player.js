import { SETTINGS } from "./settings.js";
import Inventory from "./inventory.js";
import {animateTravel} from "../components/animations.js";
import {getRandomColor} from "./helpers.js";
export default class Player {
    constructor(name = "Survivor", updateUi ) {
        /** Initialize player attributes. */
        this.id = null;
        this.name = name;
        this.health = SETTINGS.max_health;
        this.fuel = SETTINGS.max_fuel;
        this.location = null;
        this.inventory = new Inventory(); // Player inventory from Inventory class
        this.airportsInRange = [];
        this.color = getRandomColor();
        this.updateUi = updateUi;
    }

    async move(airport, currentMarker) {
        /** Move the player to a different airport. */


        if (airport.isExplored) {
            const choice = prompt("You have already visited this airport, would you like to continue? y/n");
            if (choice.toLowerCase() === "n") {
                return;
            }
        }
        const distance = this.location.calculateDistance(airport);
        const fuelRequired = Math.round(distance / SETTINGS.fuel_usage_per_km);
        if (fuelRequired > this.fuel) {
            displayErrorMessage("Not enough fuel");
            return;
        }
        this.fuel -= fuelRequired;


        this.location = airport;
        //delete the airport from the airportsInRange
        this.airportsInRange = this.airportsInRange.filter(a => a !== airport);
        await animateTravel(airport, currentMarker);
        this.updateUi();

    }
}