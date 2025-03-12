import random

from parso.python.tree import String

from config.settings import SETTINGS
from src.Helpers import  storable_items
from src.ui import display_warning_message, display_success_message, display_inventory, display_error_message


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
                    display_warning_message(f"you are being attacked by zombies total damage {value}, you have {player.inventory.items["weapon"]} weapon to defend against the attack -{SETTINGS['weapon_damage']}/weapon")
                    while True:
                        number = input("how many would you like to use? ")
                        if number.isdigit() and int(number) > 0 and (int(number) <= player.inventory.items["weapon"]):
                            number = int(number)

                            damage_after_weapon = 0
                            # damage cant be in plus
                            if value + (number * SETTINGS["weapon_damage"]) < 0:
                                damage_after_weapon = value + (number * SETTINGS["weapon_damage"])
                            setattr(player, 'health', getattr(player, 'health', 0) + damage_after_weapon)
                            display_warning_message(f"{self.description}: {value}")
                            display_success_message(f"Weapons used to reduce damage: {number}")
                            display_warning_message(f"Final Damage caused: {damage_after_weapon}")
                            player.inventory.items["weapon"] -= number
                            break
                        if len(number) == 0:
                            # user doesn't want to use any weapon
                            setattr(player, 'health', getattr(player, 'health', 0) + value)
                            display_warning_message(f"{self.description}: {value}")
                            break
                        else:
                            print("please enter a valid number")
            elif key == "survivor":
                #trade with survivor for a hint
                display_warning_message(f"[👲]Hi there! I have something valuable for you in exchange for a valuable item")
                while True:
                    choice = input("would you like to give item to the stranger? y/n")
                    if choice != "y" or len(choice) != "":
                        break
                    else:
                        exist_items = []
                        for item in player.inventory.items.keys():
                            if player.inventory.items[item] > 0:
                                exist_items.append(item)
                        if len(exist_items) == 0:
                            display_error_message("Your inventory is empty, no trade with stranger possible")
                            break
                        else:
                            random_item = random.choice(exist_items)
                            player.inventory.items[random_item] -= 1
                            display_success_message(
                                f"You have traded 1 item with stranger {random_item}: -1"
                            )
                            display_success_message(f"[💡] {self.description}")
                            break




            elif key in storable_items:
                player.inventory.add_item(key, value)
                display_success_message(f"{self.description}: {value}")
            else:
                setattr(player, key, getattr(player, key, 0) + value)
                display_success_message(f"{self.description}: {value}")
        # remove current event from the events list in the airport
        player.location.events.remove(self)
