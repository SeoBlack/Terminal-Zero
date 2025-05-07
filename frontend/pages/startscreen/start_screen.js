// --------------IMPORTS----------------
import { addNewUser } from "../../js/utils/backend-queries.js";
import { showSnackbar, snackbarType } from "../../js/components/snackbar.js";
import {getAllGames, setCurrentUser} from "../../js/components/localstorage.js";
import {playSoundEffect, soundEffects} from "../../js/components/sound_effects.js";
import {hideLoadingDialog, showLoadingDialog} from "../../js/components/loading.js";
import {showConfirmationDialog} from "../../js/components/confirmation_dialog.js";

function startScreen(){
    // --------------VARIABLES----------------

    const previousPlayers = getAllGames().map(game => game.player.name);
    const previousPlayersList = document.getElementById('previous-players');
    const newGameForm = document.getElementById('newGameForm');
    const usernameInput = document.getElementById('usernameInput');

    // Populate the previous players list
    previousPlayersList.innerHTML = '<p id="info-text">or continue where you left</p>';
    previousPlayers.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'flex row username-container';
        playerDiv.innerHTML = `
            <span class="delete-button" data-username="${player}" style="cursor: pointer;">🗑️</span>
            <p class="username-text">${player}</p>
            <svg class="arrow w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"/>
            </svg>
        `;

        // Pelin aloitus kun nimeä klikataan
        playerDiv.addEventListener('click', handleUsernameClick);

        // 🗑️ Roskiksen pelinsisäinen poistoikkuna
        const deleteButton = playerDiv.querySelector('.delete-button');
        deleteButton.addEventListener('click', async (e) => {
            e.stopPropagation(); // estetään pelin käynnistys

            const username = e.currentTarget.getAttribute('data-username');

            showConfirmationDialog(`Are you sure you want to delete player "${username}"?`, () => {
                const allGames = getAllGames().filter(game => game.player.name !== username);
                localStorage.setItem("terminal_zero", JSON.stringify(allGames));
                playerDiv.remove();
                showSnackbar(snackbarType.INFO, `"${username}" was deleted.`);
            });
        });

        previousPlayersList.appendChild(playerDiv);
    });

    // --------------------EVENT LISTENERS--------------------
    newGameForm.addEventListener('submit', handleSubmit);

    async function handleUsernameClick(event) {
         const username = event.currentTarget.querySelector('.username-text').innerText;
         try {
            const response = await addNewUser(username);
            if (!response) {
                showSnackbar(snackbarType.ERROR, "Failed to start the game. Please try again.");
                return;
            }
            setCurrentUser(username);
            playSoundEffect(soundEffects.CINEMATIC)
            playSoundEffect(soundEffects.ZOMBIE_START)
            const loader = showLoadingDialog()
            setTimeout(() => {
                hideLoadingDialog(loader)
                window.location.href = `../gamescreen/game.html`;
            }, 3000)
        } catch (error) {
            console.error("Error:", error);
            showSnackbar(snackbarType.ERROR, "Failed to start the game. Please try again.");
        }
    }

    // ----------------FUNCTIONS----------------
    async function handleSubmit(event) {
        event.preventDefault();
        const username = usernameInput.value.trim();

        if (username) {
            const response = await addNewUser(username);
            if (response) {
                await setCurrentUser(username);
                const userGame = getAllGames().find(game => game.player.name === username);
                if (userGame) {
                    showConfirmationDialog('You have a saved game. Do you want to continue where you left?', async () => {
                        const loader = showLoadingDialog()
                        playSoundEffect(soundEffects.CINEMATIC)
                        playSoundEffect(soundEffects.ZOMBIE_START)
                        setTimeout(() => {
                            hideLoadingDialog(loader)
                            return window.location.href = `../gamescreen/game.html`;
                        }, 3000)
                    })
                } else {
                    showSnackbar(snackbarType.INFO, "Welcome! Starting a new game...");
                    playSoundEffect(soundEffects.CINEMATIC)
                    playSoundEffect(soundEffects.ZOMBIE_START)
                    const loading = showLoadingDialog()
                    setTimeout(()=>{
                        hideLoadingDialog(loading)
                        return window.location.href = `../gamescreen/game.html`;
                    }, 3000)
                }
            }
        } else {
            showSnackbar(snackbarType.ERROR, 'Please enter a username');
        }
    }
}

// ----------------INIT----------------
document.addEventListener('DOMContentLoaded', startScreen );
