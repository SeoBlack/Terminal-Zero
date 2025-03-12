import random
from datetime import datetime

from airport import Airport
from config.settings import SETTINGS
from database.db_manager import DatabaseManager
from player import Player
from src.Helpers import get_hint_events, format_time
from src.events import Event
from src.ui import display_status, display_error_message, display_warning_message, display_inventory, display_airports, \
    display_win_screen, display_lose_screen, display_records
from ui import display_intro, display_menu


class Game:
    def __init__(self):
        """Initialize game settings and player state."""
        self.game_over = False
        self.db_manager  = DatabaseManager()
        self.player = Player(db_manager=self.db_manager)
        self.airports = [] ##list of the available airports to travel to
        self.initiate_game()
        self.actions = ["explore","move", "inventory", "status", "use","quit"]
        self.start_time = None
        self.end_time = None
        self.has_won = False


    def run(self):
        """Main game loop."""
        self.start_time = datetime.now()
        while not self.game_over:
            self.check_lose()
            display_menu(actions=self.actions)
            action = input("Choose an action: ").strip().lower()
            if len(action) == 0:
                continue
            else:
                self.handle_action(action)

    def get_airports(self):
        #create object for each airport to give us access to each of them
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
        self.player.update_player()
        self.generate_random_hint()
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
        elif action == "use" or action == "5":
            self.handle_use()
        elif action == "quit" or action == "6":
            self.handle_game_over()
        else:
            print("Invalid action. Try again.")

    def handle_explore_location(self):
        if self.check_win():
            return

        #loop through the events of the airport
        self.player.location.is_explored = True
        if len(self.player.location.events) == 0:
            display_warning_message("There are no resources available in this location.")
            self.check_lose()
            return
        for event in self.player.location.events:
            event.apply_event(self.player)
            self.check_lose()
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
                    if str(airport.id) == str(destination_id):
                        destination_airport = airport
                        self.player.move(destination_airport)
                        break


        if len(nearby_airports) == 0:
            display_error_message("There are no airports nearby.")
    def handle_inventory(self):
        display_inventory(self.player.inventory)
    def handle_game_over(self):
        self.game_over = True
    def handle_status(self):
        display_status(self.player)
    def handle_quit(self):
        self.game_over = True
    def handle_use(self):
        display_inventory(self.player.inventory)
        item_id = input("Enter item Name:")
        if len(item_id) == 0:
            return
        else:
            self.player.inventory.use_item(item_id, self.player)
    def generate_random_hint(self):
        safe_airport = None
        for airport in self.airports:
            if airport.is_safe:
                safe_airport = airport
                break
        if safe_airport:
            hint_events = get_hint_events(safe_airport.country)
            for airport in random.choices(self.airports, k=SETTINGS['max_survivor_encounter'] ):
                airport.events.append(Event( random.choice(hint_events), {"survivor":0}))

    def check_win(self):
        if self.player.location.is_safe:
            # Win case
            display_win_screen( self.player)
            self.end_game(has_won=True)
            return True
        else:
            return False
    def check_lose(self):
        if self.player.fuel <= 0 and not self.has_won and self.player.inventory.items["fuel"] == 0 and self.player.location.is_explored == True or self.player.health <= 0 and not self.has_won:
            display_lose_screen()
            self.end_game(has_won=False)


    def end_game(self, has_won=False):
        self.has_won = has_won
        self.handle_game_over()
        self.end_time = datetime.now()
        completion_time = self.end_time - self.start_time
        self.db_manager.create_new_game_record(self.player.id, format_time(completion_time.total_seconds()), self.has_won)
        records_list = self.db_manager.get_end_status()
        display_records(records_list)




