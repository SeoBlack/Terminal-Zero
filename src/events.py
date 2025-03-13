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

            if key == "vaurio" or key == "suuri_vaurio":
                if "ase" in player.inventory.items.keys() and player.inventory.items["ase"] > 0:
                    display_warning_message(f"Zombit hyökkäävät sinua vastaan, kokonaisvaurio {value}, sinulla on {player.inventory.items["ase"]} asetta puolustautumiseen hyökkäystä vastaan -{SETTINGS['weapon_damage']}/ase")
                    while True:
                        number = input("Kuinka monta haluaisit käyttää? ")
                        if number.isdigit() and int(number) > 0 and (int(number) <= player.inventory.items["ase"]):
                            number = int(number)

                            damage_after_weapon = 0
                            # damage cant be in plus
                            if value + (number * SETTINGS["weapon_damage"]) < 0:
                                damage_after_weapon = value + (number * SETTINGS["weapon_damage"])
                            setattr(player, 'terveys', getattr(player, 'terveys', 0) + damage_after_weapon)
                            display_warning_message(f"{self.description}: {value}")
                            display_success_message(f"Ase, jota käytetään vahingon vähentämiseen: {number}")
                            display_warning_message(f"Lopullinen vaurio: {damage_after_weapon}")
                            player.inventory.items["ase"] -= number
                            break
                        if len(number) == 0:
                            # user doesn't want to use any weapon
                            setattr(player, 'terveys', getattr(player, 'terveys', 0) + value)
                            display_warning_message(f"{self.description}: {value}")
                            break
                        else:
                            print("Anna kelvollinen numero")
            elif key == "selviytyjä":
                #trade with survivor for a hint
                display_warning_message(f"[👲]Hei! Minulla on jotain arvokasta sinulle vaihdossa arvokkaaseen esineeseen")
                while True:
                    choice = input("Haluatko antaa esineen tuntemattomalle? k/e ")
                    if choice != "k" or len(choice) != "":
                        break
                    else:
                        exist_items = []
                        for item in player.inventory.items.keys():
                            if player.inventory.items[item] > 0:
                                exist_items.append(item)
                        if len(exist_items) == 0:
                            display_error_message("Inventaariosi on tyhjä, kauppaa tuntemattoman kanssa ei voi tehdä")
                            break
                        else:
                            random_item = random.choice(exist_items)
                            player.inventory.items[random_item] -= 1
                            display_success_message(
                                f"Olet kaupannut 1 esineen tuntemattoman kanssa {random_item}: -1"
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
