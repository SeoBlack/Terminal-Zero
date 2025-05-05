class Player {
    constructor(dbManager, name = "Survivor") {
        /** Initialize player attributes. */
        this.id = null;
        this.name = name;
        this.health = SETTINGS.max_health;
        this.fuel = SETTINGS.max_fuel;
        this.location = null;
        this.dbManager = dbManager;
        this.inventory = new Inventory(dbManager); // Player inventory from Inventory class

        this.initPlayer();
    }

    move(airport) {
        /** Move the player to a different airport. */
        if (airport.isExplored) {
            const choice = prompt("You have already visited this airport, would you like to continue? y/n");
            if (choice.toLowerCase() === "n") {
                return;
            }
        }
        const distance = this.location.calculateDistance(airport);
        const fuelRequired = Math.round(distance / SETTINGS.fuel_usage_per_km);
        if (fuelRequired > this.fuel) {
            displayErrorMessage("Not enough fuel");
            return;
        }
        this.fuel -= fuelRequired;
        this.location = airport;
        animateTravel(airport.name, distance, fuelRequired);
        this.updatePlayer();
    }

    initPlayer() {
        this.name = prompt("Enter your name:");
        // This function will return the player id
        const playerId = this.dbManager.addNewPlayer(this.name, this.health, this.fuel, this.location);
        this.id = playerId;
    }

    updatePlayer() {
        // We call this function whenever changes happen to the values in Player class.
        this.dbManager.updatePlayer(this.id, this.health, this.fuel, this.location.id);
    }
}