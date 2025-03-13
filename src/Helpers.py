import random
from enum import Enum
from geopy import distance

def get_random_airport(airports):
    random_airport = random.choice(airports)
    return random_airport



# resurssit
event_types = [
    "polttoaine",
    "ruoka",
    "ase",
    "vesi",
    "vaatetus",
    "vaurio",
    "suuri_vaurio",
    "lääke"
]

storable_items = [
    "ase",
    "vesi",
    "vaatetus",
    "ruoka",
    "polttoaine",
    "lääke"
]
# Maksimiarvot
max_values = {
    "polttoaine": 2,
    "lääke": 20,
    "ruoka": 10,
    "ase": 5,
    "vesi": 5,
    "työkalut": 1,
    "vaatetus": 12,
    "vaurio": -10,
    "suuri_vaurio": -20,
}

events_with_texts = [
    {
        "polttoaine":"Löysit polttoainesäiliön!"
    },
    {
        "vaurio":"Zombit hyökkäsivät sinuun!"
    },
    {
        "suuri_vaurio": "Sinuun hyökkäsi juggernaut "
    },

    {
        "ruoka":"Löysit ruokatarvikkeita!"

    },
    {
        "lääke":"Löysit lääkkeitä!"
    },
    {
        "ase":"Löysit aseita!"
    },

]