import {storableItems} from "./helpers.js";

export default class Inventory {
    constructor() {
        /** Initialize an empty inventory. */
        this.items = {};
        this.generateRandomItems();
    }

    addItem(item, quantity = 1) {
        /** Add an item to the inventory. */
        if (this.items[item]) {
            this.items[item] += quantity;
        } else {
            this.items[item] = quantity;
        }
    }

    showInventory() {
        /** Display inventory contents. */
        displayInventory(this.items);
    }

    useItem(item, player) {
        /** Use an item from inventory. */
        if (this.items[item] && this.items[item] > 0) {
            switch (item) {
                case "fuel":
                    player.fuel = Math.min(player.fuel + SETTINGS.fuel_can_capacity, SETTINGS.max_fuel);
                    break;
                case "medicine":
                    player.health = Math.min(player.health + SETTINGS.medicine_health, SETTINGS.max_health);
                    break;
                case "food":
                    player.health = Math.min(player.health + SETTINGS.food_can_health, SETTINGS.max_health);
                    break;
                case "water":
                    player.health = Math.min(player.health + SETTINGS.water_can_health, SETTINGS.max_health);
                    break;
                case "weapon":
                    displayWarningMessage("Weapon can't be used directly, they will automatically be used to defend against zombie attacks");
                    return;
                default:
                    displayErrorMessage(`${item} cannot be used.`);
                    return;
            }
            this.items[item] -= 1;
            displaySuccessMessage(`Used ${item}. Remaining: ${this.items[item]}`);
            player.updatePlayer(); // Update the player in the database
        } else {
            displayErrorMessage(`${item} not available.`);
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