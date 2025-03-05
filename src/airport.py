import random

class Airport:
    def __init__(self, ident ,name, lat, lng, iso_country, resources=None, danger_level=0):
        """Initialize an airport with resources and danger level."""
        self.ident = ident
        self.name = name
        self.resources = resources or {}
        self.danger_level = danger_level
        self.lat = lat
        self.lng = lng
        self.iso_country = iso_country #need this to get the country from country table
        self.is_explored = False


    def explore(self):
        """Explore the airport for resources."""
        print(f"Exploring {self.name}...")
        if self.resources:
            print("You found:", self.resources)
        else:
            print("Nothing useful here.")



