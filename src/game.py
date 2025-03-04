import random

from database.db_manager import DatabaseManager
from player import Player
from airport import Airport
from src.Helpers import get_random_airport
from ui import display_intro, display_menu

class Game:
    def __init__(self):
        """Initialize game settings and player state."""
        self.player = Player()
        self.game_over = False
        self.db_manager  = DatabaseManager()
        self.airports = [] ##list of the available airports to travel to


    def run(self):
        """Main game loop."""
        self.initiate_game()
        while not self.game_over:
            print("You are now at ", self.player.location.name)
            display_menu()
            action = input("Choose an action: ").strip().lower()
            self.handle_action(action)


    def get_airports(self):
        #create object for each airport to give us access to each of them
        #TODO: create a random resources distribution
        db_airports = self.db_manager.get_all_airports()
        for airport in db_airports:
            self.airports.append(Airport(airport[0], airport[1], airport[2], airport[3], airport[4]))


    def initiate_game(self):
        """Initialize the game."""
        self.get_airports()
        self.player.location = random.choice(self.airports) # get a random airport
        display_intro()


    def handle_action(self, action):
        """Process user input."""
        if action == "move":
            self.player.move()
        elif action == "inventory":
            self.player.show_inventory()
        elif action == "quit":
            self.game_over = True
        else:
            print("Invalid action. Try again.")
