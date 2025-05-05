import { SETTINGS } from "./settings.js";
import Inventory from "./inventory.js";
import {animateTravel} from "../components/animations.js";
import {getRandomColor} from "./helpers.js";
import {showConfirmationDialog} from "../components/confirmation_dialog.js";
import {showSnackbar, snackbarType} from "../components/snackbar.js";
import {playSoundEffect, soundEffects} from "../components/sound_effects.js";
export default class Player {
    constructor(name = "Survivor", updateUi) {
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

        const distance = this.location.calculateDistance(airport);
        const fuelRequired = Math.round(distance / SETTINGS.fuel_usage_per_km);
        if (fuelRequired > this.fuel) {
            playSoundEffect(soundEffects.ERROR)
            showSnackbar(snackbarType.ERROR,"Not enough fuel");
            return;
        }
        else{
            this.fuel -= fuelRequired;
            this.location = airport;
            //delete the airport from the airportsInRange
            this.airportsInRange = this.airportsInRange.filter(a => a !== airport);
            await animateTravel(airport, currentMarker);
        }

        this.updateUi();



    }
}
