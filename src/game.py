import random
from datetime import datetime

from airport import Airport
from config.settings import SETTINGS
from database.db_manager import DatabaseManager
from player import Player
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
        self.actions = ["tutki","siirry", "inventaario", "tila", "käytä","lopeta"]
        self.start_time = None
        self.end_time = None


    def run(self):
        """Main game loop."""
        self.start_time = datetime.now()
        self.player.name = input("Syötä nimesi: ")
        while not self.game_over:
            display_menu(actions=self.actions)
            action = input("Valitse toiminto: ").strip().lower()
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
        self.generate_random_hint()
        display_intro()




    def handle_action(self, action):
        """Process user input."""
        if action == "tutki" or action == "1":
            self.handle_explore_location()
        elif action == "siirry" or action == "2":
            self.handle_move()
        elif action == "inventaario" or action == "3":
            self.handle_inventory()
        elif action == "tila" or action == "4":
            display_status(self.player)
        elif action == "käytä" or action == "5":
            self.handle_use()
        elif action == "lopeta" or action == "6":
            self.handle_game_over()
        else:
            print("Virheellinen toiminto. Yritä uudelleen.")

    def handle_explore_location(self):
        if self.check_win():
            return
        #loop through the events of the airport
        self.player.location.is_explored = True
        if len(self.player.location.events) == 0:
            display_warning_message("Tässä sijainnissa ei ole resursseja saatavilla.")
            return
        for event in self.player.location.events:
            event.apply_event(self.player)
        return

    def handle_move(self):
        nearby_airports = []
        for airport in self.airports:
            if airport.calculate_distance(self.player.location)  < SETTINGS["max_distance_km"] and airport != self.player.location :
                nearby_airports.append(airport)
        if len(nearby_airports) > 0:
            display_airports(nearby_airports, self.player.location)
            destination_id = input("Syötä määränpään ID:")
            if len(destination_id) == 0:
                return
            else:
                for airport in nearby_airports:
                    if str(airport.ident) == str(destination_id):
                        destination_airport = airport
                        self.player.move(destination_airport)
                        break


        if len(nearby_airports) == 0:
            display_error_message("Lähistöllä ei ole lentokenttiä.")
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
    def handle_use(self):
        display_inventory(self.player.inventory)
        item_id = input("Syötä tavaran nimi: ")
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
            hint_events = [

                 f"Kuulin jotain turvallisesta lentokentästä, se sijaitsee {safe_airport.country}.",
                 f"Kuulin jonkun sanovan, että turvallinen lentokenttä on piilotettu jonnekkin lähelle {safe_airport.country}.",
                 f"Väitetään, että turvallinen lentokenttä löytyy jostain täältä lähellä {safe_airport.country}.",

            ]
            for airport in random.choices(self.airports, k=SETTINGS['max_survivor_encounter'] ):
                airport.events.append(Event( random.choice(hint_events), {"selviytyjä":0}))

