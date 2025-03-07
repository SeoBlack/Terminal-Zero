import random


def get_random_airport(airports):
    random_airport = random.choice(airports)
    return random_airport



# resurssit
inventory_items = [
    'fuel',
    'medical',
    'food',
    'weapon',
    'water',
    'tools',
    'clothing'
]

# Maksimiarvot
max_values = {
    'weapon': 5,
    'medical': 50,
    'food': 50,
    'fuel': 50,
    'water': 50,
    'tools': 3,
    'clothing': 10
}
