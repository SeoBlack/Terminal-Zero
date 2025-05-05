import {showConfirmationDialog} from "../components/confirmation_dialog.js";
import {SETTINGS} from "./settings.js";
import {showSnackbar, snackbarType} from "../components/snackbar.js";
import {showInformationDialog} from "../components/information_dialog.js";
import {getRandomColor, storableItems} from "./helpers.js";
import {animateAttack, animateFoundItem} from "../components/animations.js";
import {Icons} from "../components/icons.js";
import {playSoundEffect, soundEffects} from "../components/sound_effects.js";
import {updateUI} from "../components/ui_handler.js";

export default  class Event {
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
                console.log("damage", value)
                animateAttack()
                showSnackbar(snackbarType.ERROR,`${this.description}: ${value}`);
                if (player.inventory.items.weapon && player.inventory.items.weapon > 0) {
                         playSoundEffect(soundEffects.ATTACK)
                        playSoundEffect(soundEffects.ZOMBIE)

                    const numWeapons = parseInt(player.inventory.items.weapon);
                    let damageAfterWeapon = 0;

                    // Damage can't be positive
                    if (value + (numWeapons * SETTINGS.weapon_damage) < 0) {
                        damageAfterWeapon = value + (numWeapons * SETTINGS.weapon_damage);
                    }

                    player.health = (player.health || 0) + damageAfterWeapon;

                    player.inventory.items.weapon -= numWeapons;
                    if (player.inventory.items.weapon <= 0) {
                        player.inventory.items.weapon = 0;
                    }
                    updateUI(player)
                } else {
                    player.health = (player.health || 0) + value;
                    playSoundEffect(soundEffects.ZOMBIE)
                    updateUI(player)
                }


            } else if (key === "survivor") {
                // Trade with survivor for a hint
                const travelerColor = getRandomColor();
                const htmlContent = `
                    <div class="flex">
                            <div style="color:${travelerColor};">
                            ${Icons.TRAVELER}
                            </div>
                            <p class="heading">
                                Hi there! I have something valuable for you in exchange for a valuable item.
                            </p>
                    </div>
                    
                    `
                const travelers = soundEffects.TRAVELER
                //get random traveler voice from the travelers array
                playSoundEffect(travelers[Math.floor(Math.random() * travelers.length)]);
                showConfirmationDialog(htmlContent, ()=>{
                    const existingItems = Object.keys(player.inventory.items).filter(item => player.inventory.items[item] > 0);

                        if (existingItems.length === 0) {
                            playSoundEffect(soundEffects.ERROR)
                            showSnackbar(snackbarType.ERROR, "Your inventory is empty, no trade with stranger possible.");

                        } else {
                            const randomItem = existingItems[Math.floor(Math.random() * existingItems.length)];
                            player.inventory.items[randomItem] -= 1;
                            showSnackbar(snackbarType.INFO,`You have traded 1 item with the stranger: ${randomItem} (-1)`);

                            const hintContentHTML = `
                                <div class="flex">
                                    <div style="color:${travelerColor};">
                                       ${Icons.TRAVELER}
                                    </div>
                                    <div>
                                    <h3>Hint</h3>
                                    <p>${this.description}.</p>
                                    </div>
                                </div>
                            `
                            showInformationDialog("", hintContentHTML);
                        }
                })

            } else if (storableItems.includes(key)) {
                player.inventory.addItem(key, value);
                showSnackbar(snackbarType.INFO,`${this.description}: ${value}`);
                animateFoundItem()
            } else {
                player[key] = (player[key] || 0) + value;
                showSnackbar(snackbarType.INFO,`${this.description}: ${value}`);
            }
        }
    }
}


export function jsonifyEvent(event) {
    /** Convert an event to a string. */
    return {
        description: event.description,
        effect: event.effect
    };

}