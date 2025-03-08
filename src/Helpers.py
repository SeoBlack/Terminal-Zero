import random
from enum import Enum


def get_random_airport(airports):
    random_airport = random.choice(airports)
    return random_airport



# resurssit
event_types = [
    "fuel",
    "food",
    "weapon",
    "water",
    "tools",
    "clothing",
    "damage"
]

storable_items = [
    "weapon",
    "water",
    "tools",
    "clothing",
    "food",
]
# Maksimiarvot
max_values = {
    "fuel": 2,
    "health": 20,
    "food": 10,
    "weapon": 5,
    "water": 5,
    "tools": 1,
    "clothing": 12,
    "damage": -10,
    "huge_damage": -20,
}

events_with_texts = [
    {
        "fuel":"You found a fuel can!"
    },
    {
        "damage":"You were attacked by zombies!"
    },
    {
        "huge_damage": "You were attacked by juggernaut "
    },

    {
        "food":"You found food supplies!"

    },
    {
        "health":"You found a repair kit!"
    },
    {
        "weapon":"You found weapons!"
    }
]