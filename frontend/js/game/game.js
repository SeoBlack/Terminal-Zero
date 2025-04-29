class Game {
    constructor() {
        /** Initialize game settings and player state. */
        this.gameOver = false;
        this.dbManager = new DatabaseManager();
        this.player = new Player(this.dbManager);
        this.airports = []; // List of the available airports to travel to
        this.actions = ["explore", "move", "inventory", "status", "use", "quit"];
        this.startTime = null;
        this.endTime = null;
        this.hasWon = false;

        this.initiateGame();
    }

    run() {
        /** Main game loop. */
        this.startTime = new Date();
        while (!this.gameOver) {
            this.checkLose();
            displayMenu(this.actions);
            const action = prompt("Choose an action:").trim().toLowerCase();
            if (action.length === 0) {
                continue;
            } else {
                this.handleAction(action);
            }
        }
    }

    getAirports() {
        /** Create object for each airport to give us access to each of them. */
        const dbAirports = this.dbManager.getAllAirports();
        dbAirports.forEach(airport => {
            const country = this.dbManager.getCountryByCode(airport[4]);
            this.airports.push(new Airport(airport[0], airport[1], airport[2], airport[3], country));
        });

        // Make a random airport as the safe one
        const randomAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
        randomAirport.isSafe = true;
    }

    initiateGame() {
        /** Initialize the game. */
        this.getAirports();
        this.player.location = this.airports[Math.floor(Math.random() * this.airports.length)]; // Get a random airport
        this.player.updatePlayer();
        this.generateRandomHint();
        displayIntro();
    }

    handleAction(action) {
        /** Process user input. */
        switch (action) {
            case "explore":
            case "1":
                this.handleExploreLocation();
                break;
            case "move":
            case "2":
                this.handleMove();
                break;
            case "inventory":
            case "3":
                this.handleInventory();
                break;
            case "status":
            case "4":
                displayStatus(this.player);
                break;
            case "use":
            case "5":
                this.handleUse();
                break;
            case "quit":
            case "6":
                this.handleGameOver();
                break;
            default:
                console.log("Invalid action. Try again.");
        }
    }

    handleExploreLocation() {
        if (this.checkWin()) {
            return;
        }

        // Loop through the events of the airport
        this.player.location.isExplored = true;
        if (this.player.location.events.length === 0) {
            displayWarningMessage("There are no resources available in this location.");
            this.checkLose();
            return;
        }

        this.player.location.events.forEach(event => {
            event.applyEvent(this.player);
            this.checkLose();
        });
    }

    handleMove() {
        const nearbyAirports = this.airports.filter(airport =>
            airport.calculateDistance(this.player.location) < SETTINGS.max_distance_km &&
            airport !== this.player.location
        );

        if (nearbyAirports.length > 0) {
            displayAirports(nearbyAirports, this.player.location);
            const destinationId = prompt("Enter destination ID:");
            if (destinationId.length === 0) {
                return;
            } else {
                const destinationAirport = nearbyAirports.find(airport => String(airport.id) === String(destinationId));
                if (destinationAirport) {
                    this.player.move(destinationAirport);
                }
            }
        } else {
            displayErrorMessage("There are no airports nearby.");
        }
    }

    handleInventory() {
        displayInventory(this.player.inventory);
    }

    handleGameOver() {
        this.gameOver = true;
    }

    handleUse() {
        displayInventory(this.player.inventory);
        const itemId = prompt("Enter item Name:");
        if (itemId.length === 0) {
            return;
        } else {
            this.player.inventory.useItem(itemId, this.player);
        }
    }

    generateRandomHint() {
        const safeAirport = this.airports.find(airport => airport.isSafe);
        if (safeAirport) {
            const hintEvents = getHintEvents(safeAirport.country);
            const randomAirports = Array.from({ length: SETTINGS.max_survivor_encounter }, () =>
                this.airports[Math.floor(Math.random() * this.airports.length)]
            );

            randomAirports.forEach(airport => {
                airport.events.push(new Event(hintEvents[Math.floor(Math.random() * hintEvents.length)], { survivor: 0 }));
            });
        }
    }

    checkWin() {
        if (this.player.location.isSafe) {
            // Win case
            displayWinScreen(this.player);
            this.endGame(true);
            return true;
        } else {
            return false;
        }
    }

    checkLose() {
        if (
            (this.player.fuel <= 0 && !this.hasWon && this.player.inventory.items.fuel === 0 && this.player.location.isExplored) ||
            (this.player.health <= 0 && !this.hasWon)
        ) {
            displayLoseScreen();
            this.endGame(false);
        }
    }

    endGame(hasWon = false) {
        this.hasWon = hasWon;
        this.handleGameOver();
        this.endTime = new Date();
        const completionTime = (this.endTime - this.startTime) / 1000; // Time in seconds
        this.dbManager.createNewGameRecord(this.player.id, formatTime(completionTime), this.hasWon);
        const recordsList = this.dbManager.getEndStatus();
        displayRecords(recordsList);
    }
}