import random

from parso.python.tree import String

from src.Helpers import  storable_items
from src.ui import display_warning_message, display_success_message


class Event:
    def __init__(self, description, effect):
        """Initialize an event with a description and effect."""
        self.description = description
        self.effect = effect

    def apply_event(self, player):
        """Apply the event effect to the player."""
        for key, value in self.effect.items():
            #set the player item to the current value plus the added or subtracted value.

            if key == "damage" or key == "huge_damage":
                setattr(player, 'health', getattr(player, 'health', 0) + value)
                display_warning_message(f"{self.description}: {value}")
            elif key in storable_items:
                player.inventory.add_item(key, value)
                display_success_message(f"{self.description}: {value}")
            else:
                setattr(player, key, getattr(player, key, 0) + value)
                display_success_message(f"{self.description}: {value}")
        # remove current event from the events list in the airport
        player.location.events.remove(self)
