import time
import sys
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)


def slow_print(text,color=Fore.RED,delay=0.02):
    """Prints text with a slight delay for dramatic effect."""
    for char in text:
        print(color + char + Style.RESET_ALL, end="")
        time.sleep(delay)
    # Newline at the end
    print()

def display_ascii_art():
    """Displays an ASCII art of an abandoned airport terminal."""
    art = f"""{Fore.RED}
     ████████╗███████╗███████╗ ███╗   ███╗██╗███╗   ██╗╔██████╗ ██╗      
     ╚══██╔══╝██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔═══██╗██║      
        ██║   █████╗  ███████╔╝██╔████╔██║██║██╔██╗ ██║████████║██║      
        ██║   ██╔══╝  ██╔═══██╗██║╚██╔╝██║██║██║╚██╗██║██╔═══██║██║      
        ██║   ███████╗██║   ██║██║ ╚═╝ ██║██║██║ ╚████║██║   ██║███████╗
        ╚═╝   ╚══════╝╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝╚══════╝
                                      ███████╗███████╗███████╗  ██████╗
                                      ╚════██║██╔════╝██╔═══██╗██╔═══██╗
                                        ███╔═╝█████╗  ███████╔╝██║   ██║
                                       ██╔═╝  ██╔══╝  ██╔═══██╗██║   ██║
                                      ███████╗███████╗██║   ██║╚██████╔╝
                                      ╚══════╝╚══════╝╚═╝   ╚═╝ ╚═════╝

    """
    print(art)
    time.sleep(1)


def display_intro():
    """Displays the game intro with dramatic effect."""
    display_ascii_art()

    slow_print("The world as you knew it... is gone.", Fore.RED )
    time.sleep(1)

    slow_print(
         "A deadly virus has swept across the planet, turning people into flesh-eating monsters.", Fore.LIGHTYELLOW_EX)
    slow_print( "The last safe places are fortified airports, where the infected are kept at bay.", Fore.LIGHTCYAN_EX)

    time.sleep(1)

    slow_print( "You are one of the last survivors.", Fore.LIGHTWHITE_EX)
    slow_print(
       "Your only hope is to travel between airports, scavenging for supplies and staying alive.", Fore.LIGHTGREEN_EX )

    time.sleep(1)

    slow_print( "But time is running out...", Fore.RED )
    slow_print(  "Zombies are everywhere. Supplies are scarce.",Fore.YELLOW)
    slow_print( "And not all survivors can be trusted.", Fore.LIGHTMAGENTA_EX)

    time.sleep(1.5)

    slow_print( "Will you make it to the final sanctuary, or will you become one of the infected?", Fore.CYAN)

    print("\n" + Fore.GREEN + Style.BRIGHT + "Welcome to TERMINAL ZERO.")
    time.sleep(2)

def display_menu():
    """Show the main menu options."""
    slow_print("\nMain Menu", Fore.GREEN + Style.BRIGHT)
    slow_print("1. Move to another location (move)",Fore.GREEN + Style.BRIGHT)
    slow_print("2. Check inventory (inventory)", Fore.GREEN + Style.BRIGHT)
    slow_print("3. Quit (quit)", Fore.RED + Style.BRIGHT)
