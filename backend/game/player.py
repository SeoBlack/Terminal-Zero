from backend.config.settings import SETTINGS
from backend.game.inventory import Inventory
from backend.game.ui import animate_travel, display_error_message


class Player:
    def __init__(self, db_manager,name="Survivor"):
        """Initialize player attributes."""
        self.id = None
        self.name = name
        self.health = SETTINGS["max_health"]
        self.fuel = SETTINGS["max_fuel"]
        self.location = None
        self.db_manager = db_manager
        self.inventory = Inventory(db_manager) #player inventory from inventory class

        self.init_player()

    def move(self, airport):
        """Move the player to a different airport."""
        # laskee matkan pituuden sekä tarvittava poltoaine
        if airport.is_explored:
            choice = input ("You have already visited this airport, would you like to continue? y/n")
            if choice.lower() == "n":
                return
        matka  = self.location.calculate_distance(airport)
        fuel =  round(matka/SETTINGS["fuel_usage_per_km"])
        if fuel > self.fuel:
            display_error_message("Not enough fuel")
            return
        self.fuel -= fuel
        self.location = airport
        animate_travel(
            airport.name,matka, fuel )
        self.update_player()
    def init_player(self):
        self.name = input("Enter your name:")
        # this function will return the player id
        player_id = self.db_manager.add_new_player(self.name, self.health, self.fuel, self.location)
        self.id = player_id

    def update_player(self):
        # we call this function whenever changes happen to the values in player class.
        self.db_manager.update_player(self.id, self.health, self.fuel, self.location.id)

