import random

from src.Helpers import storable_items
from src.ui import display_inventory


class Inventory:
    def __init__(self):
        """Initialize an empty inventory."""
        self.items = {}
        self.generate_random_items()

    def add_item(self, item, quantity=1):
        """Add an item to the inventory."""
        #print("adding",item, quantity)
        if item in self.items:
            self.items[item] += quantity
        else:
            self.items[item] = quantity
        #print(self.items)

    def show_inventory(self):
        """Display inventory contents."""
        display_inventory(self.items)

    def use_item(self, item):
        """Use an item from inventory."""
        if item in self.items and self.items[item] > 0:
            self.items[item] -= 1
            print(f"You used {item}. Remaining: {self.items[item]}")
            if self.items[item] == 0:
                del self.items[item]
            return True
        else:
            print(f"{item} not available in inventory.")
            return False

    def generate_random_items(self):
        """Generate random items at the start"""
        random_inventory_items = random.sample(storable_items, 3)
        for item in random_inventory_items:
            self.add_item(item, random.randint(1, 3))

