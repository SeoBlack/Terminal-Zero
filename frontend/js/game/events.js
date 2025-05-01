class Event {
    constructor(description, effect) {
        /** Initialize an event with a description and effect. */
        this.description = description;
        this.effect = effect;
    }

    applyEvent(player) {
        /** Apply the event effect to the player. */
        for (const [key, value] of Object.entries(this.effect)) {
            // Set the player item to the current value plus the added or subtracted value.
            if (key === "damage" || key === "huge_damage") {
                if (player.inventory.items.weapon && player.inventory.items.weapon > 0) {
                    displayWarningMessage(`You are being attacked by zombies. Total damage: ${value}, you have ${player.inventory.items.weapon} weapon(s) to defend against the attack (-${SETTINGS.weapon_damage}/weapon)`);

                    while (true) {
                        const number = prompt("How many would you like to use?");
                        if (number && !isNaN(number) && parseInt(number) > 0 && parseInt(number) <= player.inventory.items.weapon) {
                            const numWeapons = parseInt(number);
                            let damageAfterWeapon = 0;

                            // Damage can't be positive
                            if (value + (numWeapons * SETTINGS.weapon_damage) < 0) {
                                damageAfterWeapon = value + (numWeapons * SETTINGS.weapon_damage);
                            }

                            player.health = (player.health || 0) + damageAfterWeapon;
                            displayWarningMessage(`${this.description}: ${value}`);
                            displaySuccessMessage(`Weapons used to reduce damage: ${numWeapons}`);
                            displayWarningMessage(`Final Damage caused: ${damageAfterWeapon}`);
                            player.inventory.items.weapon -= numWeapons;
                            break;
                        } else if (!number) {
                            // User doesn't want to use any weapon
                            player.health = (player.health || 0) + value;
                            displayWarningMessage(`${this.description}: ${value}`);
                            break;
                        } else {
                            console.log("Please enter a valid number.");
                        }
                    }
                } else {
                    player.health = (player.health || 0) + value;
                    displayWarningMessage(`${this.description}: ${value}`);
                }
            } else if (key === "survivor") {
                // Trade with survivor for a hint
                displayWarningMessage("[👲] Hi there! I have something valuable for you in exchange for a valuable item.");
                while (true) {
                    const choice = prompt("Would you like to give an item to the stranger? Y/n (enter)").trim().toLowerCase();
                    if (choice === "y" || choice === "") {
                        const existingItems = Object.keys(player.inventory.items).filter(item => player.inventory.items[item] > 0);

                        if (existingItems.length === 0) {
                            displayErrorMessage("Your inventory is empty, no trade with stranger possible.");
                            break;
                        } else {
                            const randomItem = existingItems[Math.floor(Math.random() * existingItems.length)];
                            player.inventory.items[randomItem] -= 1;
                            displaySuccessMessage(`You have traded 1 item with the stranger: ${randomItem} (-1)`);
                            displaySuccessMessage(`[💡] ${this.description}`);
                            break;
                        }
                    } else if (choice === "n") {
                        break;
                    } else {
                        console.log("Invalid choice.");
                    }
                }
            } else if (storableItems.includes(key)) {
                player.inventory.addItem(key, value);
                displaySuccessMessage(`${this.description}: ${value}`);
            } else {
                player[key] = (player[key] || 0) + value;
                displaySuccessMessage(`${this.description}: ${value}`);
            }
        }

        // Remove current event from the events list in the airport
        const eventIndex = player.location.events.indexOf(this);
        if (eventIndex > -1) {
            player.location.events.splice(eventIndex, 1);
        }
    }
}