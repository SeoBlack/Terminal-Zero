from config.settings import SETTINGS
from src.Helpers import get_random_airport
from src.inventory import Inventory
from src.ui import animate_travel, display_menu, display_error_message


class Player:
    def __init__(self, name="Selviytyjä"):
        """Initialize player attributes."""
        self.name = name
        self.health = SETTINGS["max_health"]
        self.fuel = SETTINGS["max_fuel"]
        self.inventory = Inventory() #player inventory from inventory class
        self.location = None

    def move(self, airport):
        """Move the player to a different airport."""
        # laskee matkan pituuden sekä tarvittava poltoaine
        if airport.is_explored:
            choice = input ("Olet jo vieraillut tällä lentokentällä, haluatko jatkaa? k/e ")
            if choice.lower() == "e":
                return
        matka  = self.location.calculate_distance(airport)
        fuel =  round(matka/SETTINGS["fuel_usage_per_km"])
        if fuel > self.fuel:
            display_error_message("Ei tarpeeksi polttoainetta")
            return
        self.fuel -= fuel
        self.location = airport
        animate_travel(
            airport.name,matka, fuel )


    def show_inventory(self):
        """Display player's inventory."""
        print("Inventaario:", self.inventory)
