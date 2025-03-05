from src.inventory import Inventory


class Player:
    def __init__(self, name="Survivor"):
        """Initialize player attributes."""
        self.name = name
        self.health = 100
        self.fuel = 50
        self.inventory = Inventory() #player inventory from inventory class
        self.location = None,

    def move(self, airport):
        """Move the player to a different airport."""
        self.player.location = airport
        print("You moved to a new location.")

    def show_inventory(self):
        """Display player's inventory."""
        print("Inventory:", self.inventory)
