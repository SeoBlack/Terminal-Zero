from player import Player
from airport import Airport
from ui import display_intro, display_menu

class Game:
    def __init__(self):
        """Initialize game settings and player state."""
        self.player = Player()
        self.running = True

    def run(self):
        """Main game loop."""
        display_intro()
        while self.running:
            display_menu()
            action = input("Choose an action: ").strip().lower()
            self.handle_action(action)

    def handle_action(self, action):
        """Process user input."""
        if action == "move":
            self.player.move()
        elif action == "inventory":
            self.player.show_inventory()
        elif action == "quit":
            self.running = False
        else:
            print("Invalid action. Try again.")

if __name__ == "__main__":
    Game().run()
