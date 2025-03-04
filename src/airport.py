import random

class Airport:
    def __init__(self, name, resources=None, danger_level=0):
        """Initialize an airport with resources and danger level."""
        self.name = name
        self.resources = resources or {}
        self.danger_level = danger_level

    def explore(self):
        """Explore the airport for resources."""
        print(f"Exploring {self.name}...")
        if self.resources:
            print("You found:", self.resources)
        else:
            print("Nothing useful here.")

    def get_random_airport(self, airports):
        random_airport = random.choice(airports)
        return random_airport

