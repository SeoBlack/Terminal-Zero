import { SETTINGS } from "./settings.js";
import Inventory, {jsonifyInventory} from "./inventory.js";
import {animateTravel} from "../components/animations.js";
import {getRandomColor} from "./helpers.js";
import {showConfirmationDialog} from "../components/confirmation_dialog.js";
import {showSnackbar, snackbarType} from "../components/snackbar.js";
import {playSoundEffect, soundEffects} from "../components/sound_effects.js";
import Airport, {jsonifyAirport} from "./airport.js";
export default class Player {
    constructor(id = null, name = "survivor", health = SETTINGS.max_health, fuel = SETTINGS.max_fuel, location = null, inventory = null, airportsInRange = [], color = null, updateUi = null, iconIndex = null) {
        /** Initialize player attributes. */
        this.id = id || Math.floor(Math.random() * 1000000);
        this.name = name;
        this.health = health;
        this.fuel = fuel;
        this.location = location;
        this.inventory = inventory || new Inventory();
        this.airportsInRange = airportsInRange;
        this.color = color || getRandomColor();
        this.updateUi = updateUi;
         //randomly select an icon from the list of 2 icons

        this.iconIndex = iconIndex == null ? (Math.random() < 0.5 ? 0 : 1) : iconIndex;




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
            this.updateUi();
        }





    }
}


export function jsonifyPlayer(player) {
    /** Convert player object to a string for local storage. */
    return{
        id: player.id,
        name: player.name,
        health: player.health,
        fuel: player.fuel,
        location: player.location.id,
        inventory: jsonifyInventory(player.inventory),
        airportsInRange: player.airportsInRange.map(airport => airport.id),
        color: player.color,
        iconIndex: player.iconIndex
    };
}