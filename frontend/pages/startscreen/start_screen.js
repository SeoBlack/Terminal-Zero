const newGameButton = document.getElementById("newGame");
const previousPlayers = ['Sorin', 'Isla', 'Nikita', 'Abbas'];
const previousPlayersList = document.getElementById('previous-players');

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
