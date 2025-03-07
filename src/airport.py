import random

from config.settings import SETTINGS
from src.Helpers import max_values, events_with_texts  # Tuodaan molemmat
from src.events import Event


class Airport:
    def __init__(self, ident, name, lat, lng, iso_country, events = None, danger_level=1):
        """Initialize an airport with resources and danger level."""
        self.ident = ident
        self.name = name
        self.events = events or []
        self.danger_level = danger_level or random.randint(1, SETTINGS.get("max_danger_level"))
        self.lat = lat
        self.lng = lng
        self.iso_country = iso_country
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






