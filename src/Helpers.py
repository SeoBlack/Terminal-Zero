import random
from enum import Enum
from geopy import distance

def get_random_airport(airports):
    random_airport = random.choice(airports)
    return random_airport



# resurssit
event_types = [
    "fuel",
    "food",
    "weapon",
    "water",
    "damage",
    "huge_damage",
    "medicine"
]

storable_items = [
    "weapon",
    "water",
    "food",
    "fuel",
    "medicine"
]
# Maksimiarvot
max_values = {
    "fuel": 2,
    "medicine": 20,
    "food": 10,
    "weapon": 5,
    "water": 5,
    "tools": 1,
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
        "medicine":"You found Medicines!"
    },
    {
        "weapon":"You found weapons!"
    },

]
def get_hint_events(country):
    hint_events = [

        f"I heard something about the safe airport, it's located in {country}.",
        f"I overheard someone say that the safe airport is hidden somewhere near {country}.",
        f"Rumor has it, the safe airport can be found somewhere around {country}.",

    ]
    return hint_events

def format_time(seconds):
    seconds = seconds % (24 * 3600)
    minutes = seconds // 60
    seconds %= 60
    return "%02d:%02d" % (minutes, seconds)