class Player:
    def __init__(self, name="Survivor"):
        """Initialize player attributes."""
        self.name = name
        self.health = 100
        self.fuel = 50
        self.inventory = []
        self.location = None

    def move(self):
        """Move the player to a different airport."""
        print("You moved to a new location.")

    def show_inventory(self):
        """Display player's inventory."""
        print("Inventory:", self.inventory)
