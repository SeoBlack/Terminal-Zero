export function StartScreen() {
    // State variables
    const previousPlayers = ['Sorin', 'Isla', 'Nikita', 'Nikita', 'Abbas'];
    let usernameInput, newGameForm;

    // DOM creation
    const container = document.createElement('div');
    container.className = 'start-screen';

    // Render function
    function render() {
        container.innerHTML = `
            <canvas id="fireflies"></canvas>
            <div class="menu">
                <form action="#" method="post" id="newGameForm" class="flex row">
                    <input class="transparent_input" type="text" name="username" id="usernameInput" placeholder="Enter your name">
                    <button id="newGame" type="submit">New Game</button>
                </form>
                <div id="previous-players"></div>
            </div>
        `;

        // Cache DOM elements
        usernameInput = container.querySelector('#usernameInput');
        newGameForm = container.querySelector('#newGameForm');
        const previousPlayersList = container.querySelector('#previous-players');

        // Populate previous players
        previousPlayersList.innerHTML = '<p id="info-text">or continue where you left</p>';
        previousPlayers.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'flex row username-container';
            playerDiv.innerHTML = `
                <p class="username-text">${player}</p>
                <svg class="arrow w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"/>
                </svg>
            `;
            previousPlayersList.appendChild(playerDiv);
        });

        return container;
    }

    // Event handlers
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

    // Setup function
    function init() {
        // Load external scripts
        loadScript('../../../js/components/dynamic_bg/dynamic_bg.js');
        loadScript('../../../js/components/quick_buttons.js');

        // Add event listeners
        newGameForm.addEventListener('submit', handleSubmit);
    }

    // Cleanup function
    function cleanup() {
        if (newGameForm) {
            newGameForm.removeEventListener('submit', handleSubmit);
        }
    }

    // Helper function to load scripts
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
    }

    return {
        render,
        init,
        cleanup,
        css: 'styles.css' // Path to your CSS file
    };
}