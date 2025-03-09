import random
from datetime import datetime

from config.settings import SETTINGS
from database.db_manager import DatabaseManager
from player import Player
from airport import Airport
from src import player
from src.Helpers import get_random_airport
from src.events import Event
from src.ui import display_status, display_error_message, display_warning_message, display_inventory, display_airports, \
    display_win_screen
from ui import display_intro, display_menu

class Game:
    def __init__(self):
        """Initialize game settings and player state."""
        self.player = Player()
        self.game_over = False
        self.db_manager  = DatabaseManager()
        self.airports = [] ##list of the available airports to travel to
        self.initiate_game()
        self.actions = ["explore","move", "inventory", "status","quit"]
        self.start_time = None
        self.end_time = None


    def run(self):
        """Main game loop."""
        self.start_time = datetime.now()
        self.player.name = input("Enter your name:")
        self.player.location.is_safe = True
        while not self.game_over:
            display_menu(actions=self.actions)
            action = input("Choose an action: ").strip().lower()
            if len(action) == 0:
                continue
            else:
                self.handle_action(action)

    def get_airports(self):
        #create object for each airport to give us access to each of them
        #TODO: create a random resources distribution
        db_airports = self.db_manager.get_all_airports()
        for airport in db_airports:
            country = self.db_manager.get_country_by_code(airport[4])
            self.airports.append(Airport(airport[0], airport[1], airport[2], airport[3], country))
        # make a random airport as the safe one
        random.choice(self.airports).is_safe = True



    def initiate_game(self):
        """Initialize the game."""
        self.get_airports()
        self.player.location = random.choice(self.airports) # get a random airport
        display_intro()



    def handle_action(self, action):
        """Process user input."""
        if action == "explore" or action == "1":
            self.handle_explore_location()
        elif action == "move" or action == "2":
            self.handle_move()
        elif action == "inventory" or action == "3":
            self.handle_inventory()
        elif action == "status" or action == "4":
            display_status(self.player)
        elif action == "quit" or action == "5":
            self.handle_game_over()
        else:
            print("Invalid action. Try again.")

    def handle_explore_location(self):
        if self.check_win():
            return
        #loop through the events of the airport

        if len(self.player.location.events) == 0:
            display_warning_message("There are no resources available in this location.")
            return
        for event in self.player.location.events:
            event.apply_event(self.player)
            self.player.location.is_explored = True
        return

    def handle_move(self):
        nearby_airports = []
        for airport in self.airports:
            if airport.calculate_distance(self.player.location)  < SETTINGS["max_distance_km"] and airport != self.player.location :
                nearby_airports.append(airport)
        if len(nearby_airports) > 0:
            display_airports(nearby_airports, self.player.location)
            destination_id = input("Enter destination ID:")
            if len(destination_id) == 0:
                return
            else:
                for airport in nearby_airports:
                    if str(airport.ident) == str(destination_id):
                        destination_airport = airport
                        self.player.move(destination_airport)
                        break


        if len(nearby_airports) == 0:
            display_error_message("There are no airports nearby.")
        #TODO: handle player movement and fuel calculations
    def handle_inventory(self):
        display_inventory(self.player.inventory)
        #TODO: handle player inventory opening and items usage.
    def handle_game_over(self):
        self.game_over = True
    def handle_status(self):
        display_status(self.player)
    def handle_quit(self):
        self.game_over = True
    def check_win(self):
        if self.player.location.is_safe:
            # Win case
            self.end_time = datetime.now()
            completion_time = self.end_time - self.start_time
            display_win_screen(completion_time, self.player)
            self.handle_game_over()
            return True
        else:
            return False