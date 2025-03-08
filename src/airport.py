import random
from src.Helpers import inventory_items, max_values  # Tuodaan molemmat

class Airport:
    def __init__(self, ident, name, lat, lng, iso_country, resources=None, danger_level=0):
        """Initialize an airport with resources and danger level."""
        self.ident = ident
        self.name = name
        self.resources = resources or {}
        self.danger_level = danger_level
        self.lat = lat
        self.lng = lng
        self.iso_country = iso_country
        self.is_explored = False
        self.generate_resource()

    def explore(self):
        """Explore the airport for resources."""
        print(f"Exploring {self.name}...")
        if self.resources:
            print("You found:", self.resources)
        else:
            print("Nothing useful here.")

    def generate_resource(self):
        """Generate a random list of resources for the airport."""
        random_resources = random.sample(inventory_items, 2)

        self.resources = {
            resource: random.randint(1, max_values.get(resource, 50)) for resource in random_resources
        }
