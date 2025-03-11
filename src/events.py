import random

from parso.python.tree import String

from config.settings import SETTINGS
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
                if "weapon" in player.inventory.items.keys() and player.inventory.items["weapon"] > 0:
                    print(f"you are being attacked by zombies, you have {player.inventory.items["weapon"]} weapon to defend against the attack ")
                    while True:
                        number = input("how many would you like to use? ")
                        if number.isdigit() and int(number) > 0 and (int(number) <= player.inventory.items["weapon"]):
                            number = int(number)

                            damage_after_weapon = value - (number * SETTINGS["weapon_damage"])
                            setattr(player, 'health', getattr(player, 'health', 0) + damage_after_weapon)
                            display_warning_message(f"{self.description}: {damage_after_weapon}, weapons used to reduce damage: {number}")
                            break
                        if len(number) == 0:
                            # user doesn't want to use any weapon
                            setattr(player, 'health', getattr(player, 'health', 0) + value)
                            display_warning_message(f"{self.description}: {value}")
                            break
                        else:
                            print("please enter a valid number")


            elif key in storable_items:
                player.inventory.add_item(key, value)
                display_success_message(f"{self.description}: {value}")
            else:
                setattr(player, key, getattr(player, key, 0) + value)
                display_success_message(f"{self.description}: {value}")
        # remove current event from the events list in the airport
        player.location.events.remove(self)
