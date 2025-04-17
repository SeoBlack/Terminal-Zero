import random

from geopy import distance

from backend.config.settings import SETTINGS
from backend.game.Helpers import max_values, events_with_texts  # Tuodaan molemmat
from backend.game.events import Event


class Airport:
    def __init__(self, id, name, lat, lng, country, events = None):
        """Initialize an airport with resources and danger level."""
        self.id = id
        self.name = name
        self.events = events or []
        self.danger_level =  random.randint(1, SETTINGS.get("max_danger_level"))
        self.lat = lat
        self.lng = lng
        self.country = country
        self.is_explored = False
        self.is_safe = False
        self.generate_events()

    def generate_events(self):
        """Generate a random list of events for the airport."""
        random_events = random.choices(events_with_texts, k=random.randint(0, 3))

        for event in random_events:
            for key, description in event.items():
                # dangerous places might have high damages but also high rewards.
                effect = {
                    key: round(random.uniform(1, max_values[key])) * self.danger_level
                }
                self.events.append(Event(description, effect))

    def calculate_distance(self, destination):
        result = distance.distance((self.lat, self.lng), (destination.lat, destination.lng)).km
        return round(result, 2)



