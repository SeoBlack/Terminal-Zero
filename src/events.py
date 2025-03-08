import random

class Event:
    def __init__(self, description, effect):
        """Initialize an event with a description and effect."""
        self.description = description
        self.effect = effect

    @staticmethod
    def generate_random_event():
        """Create a random event."""
        events = [
            Event("You found a fuel can!", {"fuel": 10}),
            Event("You were ambushed by zombies!", {"health": -20}),
            Event("You found food supplies!", {"food": 5})
        ]
        return random.choice(events)

    def apply_event(self, player):
        """Apply the event effect to the player."""
        for key, value in self.effect.items():
            setattr(player, key, getattr(player, key, 0) + value)
        print(f"Event: {self.description}")
