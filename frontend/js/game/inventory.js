import {storableItems} from "./helpers.js";
import {SETTINGS} from "./settings.js";
import {showSnackbar, snackbarType} from "../components/snackbar.js";
import {playSoundEffect, soundEffects} from "../components/sound_effects.js";
import {updateInventoryUI, updateUI} from "../components/ui_handler.js";

export default class Inventory {
    constructor(items = {}) {
        /** Initialize an empty inventory. */
        this.items = items;
        if(Object.keys(this.items).length === 0) {
            this.generateRandomItems();
        }
    }

    addItem(item, quantity = 1) {
        /** Add an item to the inventory. */
        if (this.items[item]) {
            this.items[item] += quantity;
        } else {
            this.items[item] = quantity;
        }
    }

    loadInventory(loadedInventory) {
        /** Load a saved inventory. */
        this.items = loadedInventory.items;
    }
    useItem(item, player) {
        /** Use an item from inventory. */
        if (this.items[item] && this.items[item] > 0) {
            switch (item) {
                case "fuel":
                    if (player.fuel < SETTINGS.max_fuel) {
                        playSoundEffect(soundEffects.fuel)
                        player.fuel = Math.min(player.fuel + SETTINGS.fuel_can_capacity, SETTINGS.max_fuel);
                    }else {
                        playSoundEffect(soundEffects.ERROR)
                        showSnackbar(snackbarType.ERROR, "Fuel is already full");
                        return;
                    }
                    break;
                case "medicine":
                    if (player.health < SETTINGS.max_health) {
                        playSoundEffect(soundEffects.medicine)
                        player.health = Math.min(player.health + SETTINGS.medicine_health, SETTINGS.max_health);
                    }else {
                        playSoundEffect(soundEffects.ERROR)
                        showSnackbar(snackbarType.ERROR, "Health is already full");
                        return;
                    }
                    break;
                case "food":
                    if (player.health < SETTINGS.max_health) {
                        playSoundEffect(soundEffects.food)
                        player.health = Math.min(player.health + SETTINGS.food_can_health, SETTINGS.max_health);
                    }else {
                        playSoundEffect(soundEffects.ERROR)
                        showSnackbar(snackbarType.ERROR, "Health is already full");
                        return;
                    }
                    break;
                case "water":
                    if (player.health < SETTINGS.max_health) {
                        playSoundEffect(soundEffects.water)
                        player.health = Math.min(player.health + SETTINGS.water_can_health, SETTINGS.max_health);
                    }
                    else {
                        playSoundEffect(soundEffects.ERROR)
                        showSnackbar(snackbarType.ERROR, "Health is already full");
                        return;
                    }
                    break;
                case "weapon":
                    playSoundEffect(soundEffects.ERROR)
                    showSnackbar(snackbarType.ERROR, "Weapon can't be used directly, they will automatically be used to defend against zombie attacks");
                    return;
                default:
                    playSoundEffect(soundEffects.ERROR)
                    showSnackbar(snackbarType.ERROR, "Unknown item");
                    return;
            }
            this.items[item] -= 1;
            showSnackbar(snackbarType.INFO,`Used ${item}. Remaining: ${this.items[item] ?? 0}`);
            updateUI(player)
        } else {
            playSoundEffect(soundEffects.ERROR);
            showSnackbar(snackbarType.ERROR, `${item} not available.`);
        }
    }

    generateRandomItems() {
        /** Generate random items at the start. */
        const randomInventoryItems = getRandomSubset(storableItems, 3);
        randomInventoryItems.forEach(item => {
            this.addItem(item, getRandomInt(1, 3));
        });
    }
}

// Helper functions
function getRandomSubset(array, size) {
    const shuffled = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, size);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function jsonifyInventory(inventory) {
    /** Convert inventory to a string for display. */
    return inventory

}