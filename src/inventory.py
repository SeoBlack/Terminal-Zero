import random

from config.settings import SETTINGS
from src.Helpers import storable_items
from src.ui import display_inventory, display_success_message, display_error_message, display_warning_message


class Inventory:
    def __init__(self):
        """Initialize an empty inventory."""
        self.items = {}
        self.generate_random_items()

    def add_item(self, item, quantity=1):
        """Add an item to the inventory."""
        if item in self.items:
            self.items[item] += quantity
        else:
            self.items[item] = quantity
    def show_inventory(self):
        """Display inventory contents."""
        display_inventory(self.items)

    def use_item(self, item, player):
        """Use an item from inventory."""
        if item in self.items.keys() and self.items[item] > 0:
            if item == "polttoaine":
                if player.fuel + SETTINGS['fuel_can_capacity'] > SETTINGS['max_fuel']:
                    player.fuel = SETTINGS['max_fuel']
                else:
                    player.fuel += SETTINGS['fuel_can_capacity']
            elif item == "lääke":
                if player.health + SETTINGS['medicine_health'] > SETTINGS['max_health']:
                    player.health = SETTINGS['max_health']
                else:
                    player.health += SETTINGS['medicine_can_health']
            elif item == "ruoka":
                if player.health + SETTINGS['food_can_health'] > SETTINGS['max_health']:
                    player.health = SETTINGS['max_health']
                else:
                    player.health += SETTINGS['food_can_health']
            elif item == "vesi":
                if player.health + SETTINGS['water_can_health'] > SETTINGS['max_health']:
                    player.health = SETTINGS['max_health']
                else:
                    player.health += SETTINGS['water_can_health']
            elif item == "ase":
                display_warning_message("Aseita ei voi käyttää suoraan, ne käytetään automaattisesti puolustautumaan zombien hyökkäyksiltä.")
                return
            self.items[item] -= 1
            display_success_message(f"Käytetty {item}. Jäljellä: {self.items[item]}")
        else:
            display_error_message(f"{item} ei saatavilla.")
    def generate_random_items(self):
        """Generate random items at the start"""
        random_inventory_items = random.sample(storable_items, 3)
        for item in random_inventory_items:
            self.add_item(item, random.randint(1, 3))

