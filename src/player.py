from src.Helpers import get_random_airport
from src.inventory import Inventory
from src.ui import animate_travel, display_menu, display_error_message


class Player:
    def __init__(self, name="Survivor"):
        """Initialize player attributes."""
        self.name = name
        self.health = 100
        self.fuel = 100
        self.inventory = Inventory() #player inventory from inventory class
        self.location = None

    def move(self, airport):
        """Move the player to a different airport."""
        # laskee matkan pituuden sekä tarvittava poltoaine
        matka  = self.location.calculate_distance(airport)
        fuel =  round(matka/100)
        if fuel > self.fuel:
            display_error_message("Not enough fuel")
            return
        self.fuel -= fuel
        self.location = airport
        #TODO: do the fuel system and distance calculation
        animate_travel(
            airport.name,matka, fuel )


    def show_inventory(self):
        """Display player's inventory."""
        print("Inventory:", self.inventory)
