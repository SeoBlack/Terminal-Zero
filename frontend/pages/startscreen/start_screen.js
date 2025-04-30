// --------------IMPORTS----------------


// --------------VARIABLES----------------
import {addNewUser} from "../../js/utils/backend-queries.js";
import {showSnackbar, snackbarType} from "../../js/components/snackbar.js";

const previousPlayers = ['Sorin', 'Isla', 'Nikita', 'Abbas'];
const previousPlayersList = document.getElementById('previous-players');
const newGameForm = document.getElementById('newGameForm');
const usernameInput = document.getElementById('usernameInput');

// Populate the previous players list
previousPlayersList.innerHTML = '<p id="info-text">or continue where you left</p>'; // Clear the list before populating
previousPlayers.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'flex row username-container';
    playerDiv.innerHTML = `
            <p class="username-text">${player}</p>
            <svg class=" arrow w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"/>
            </svg>
    `
    previousPlayersList.appendChild(playerDiv);

})

// --------------------EVENT LISTENERS--------------------
newGameForm.addEventListener('submit', handleSubmit);


// ----------------FUNCTIONS----------------
async function handleSubmit(event) {
        event.preventDefault();
        const username = usernameInput.value.trim();

        if (username) {
            // Post the username to the server
            const response = await addNewUser(username);
            if (response) {
                return window.location.href = `../gamescreen/game.html?username=${username}`;
            }
        } else {
            showSnackbar(snackbarType.ERROR, 'Please enter a username');
        }
    }
