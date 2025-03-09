import time
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text
# Initialize Rich console
console = Console()

def slow_print(text, style="bold red", delay=0.02):
    """Prints text with a slight delay while preserving rich styling."""
    for char in text:
        console.print(f"[{style}]{char}[/]", end="", highlight=False)
        # time.sleep(delay)
    console.print()  # Newline at the end

def display_ascii_art():
    """Displays an ASCII art of an abandoned airport terminal."""
    art = """[bold red]
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
[/]"""
    console.print(Panel(art, title="[bold red]TERMINAL ZERO[/]", border_style="red", expand=False))
    # time.sleep(1)
    table = Table( style="cyan")
    table.add_column("authors", style="bold white", justify="center")

    table.add_row(f"[bold red]Soreen Oraibi[/]")
    table.add_row(f"[bold yellow]Nikita Soo[/]")
    table.add_row(f"[bold blue]Isla Mannerheimo[/]")
    table.add_row(f"[bold white]Alabass Alkhrsany[/]")
    console.print(table)


def display_intro():
    """Displays the game intro with dramatic effect."""
    display_ascii_art()

    slow_print("[⚠️] The world as you knew it... is gone.", "bold red")
    # time.sleep(1)

    slow_print("[⚠️] A deadly virus has swept across the planet, turning people into flesh-eating monsters.", "bold yellow")
    slow_print("[⚠️] The last safe places are fortified airports, where the infected are kept at bay.", "bold cyan")

    # time.sleep(1)

    slow_print("[⚠️] You are one of the last survivors.", "bold white")
    slow_print("[⚠️] Your only hope is to travel between airports, scavenging for supplies and staying alive.", "bold green")

    # time.sleep(1)

    slow_print("[⚠️] But time is running out...", "bold red")
    slow_print("[⚠️] Zombies are everywhere. Supplies are scarce.", "bold yellow")
    slow_print("[⚠️] And not all survivors can be trusted.", "bold magenta")

    # time.sleep(1.5)

    slow_print("[⚠️] Will you make it to the final sanctuary, or will you become one of the infected?", "bold cyan")

    console.print("\n[bold green]Welcome to TERMINAL ZERO.[/]")
    # time.sleep(2)

def display_status(player):
    """Displays the player's current status in a clean, structured format."""
    table = Table(title=f"[bold cyan]📊 CURRENT STATUS: {player.name}[/]", style="cyan")
    table.add_column("Attribute", style="bold white", justify="center")
    table.add_column("Value", style="bold yellow", justify="center")

    table.add_row("🩸 Health", f"[bold red]{player.health}/100[/]")
    table.add_row("⛽  Fuel", f"[bold yellow]{player.fuel} L[/]")
    table.add_row("📍 Location", f"[bold blue]{player.location.name}[/]")
    table.add_row("🌐 Country",f"[bold green]{player.location.country}[/]")
    table.add_row("🎒 Inventory", f"[bold yellow]{sum(player.inventory.items.values())} items[/]")

    console.print(table)

def display_inventory(inventory):
    """Displays the player's inventory in a clean, structured table format."""
    if not inventory:
        console.print(Panel("[bold red]Empty Inventory[/]", title="🎒 Inventory", border_style="red", expand=False))
        return

    table = Table(title="🎒 Inventory", style="bold green")
    table.add_column("Item", style="bold white", justify="left")
    table.add_column("Quantity", style="bold yellow", justify="center")

    for item_name, quantity in inventory.items.items():
        table.add_row(item_name, f"[bold yellow]{quantity}[/]")

    console.print(table)

def display_menu(actions):
    """Show the main menu options in a visually appealing way."""
    console.print(Panel("[bold green]MAIN MENU[/]", border_style="green", expand=False))
    for i, option in enumerate(actions, start=1):
        if option == "explore":
            console.print(f"[bold green][{i}] Explore the airport 🏢 (explore)[/]")
        elif option == "move":
            console.print(f"[bold cyan][{i}] Move to another location ✈️  (move)[/]")
        elif option == "inventory":
            console.print(f"[bold yellow][{i}] Check inventory 🎒  (inventory)[/]")
        elif option == "status":
            console.print(f"[bold white][{i}] Check Current Status 📈  (status)[/]")
        elif option == "quit":
            console.print(f"[bold red][{i}] Quit ❌  (quit)[/]")


def animate_travel(destination, distance , fuel):
    """Displays an animated transition when moving to a new location."""
    console.print("\n[bold cyan]✈️ Preparing for departure...[/]")
    time.sleep(1)
    console.print("[bold yellow]🚀 Taking off...[/]")
    time.sleep(1.5)
    console.print(f"[bold blue]🌍 Flying to {destination}...[/]")
    time.sleep(2)
    console.print(f"[bold green]🛬 You have arrived at {destination}![/]")
    time.sleep(1)
    console.print(f"[bold yellow]⛽  Fuel used {fuel}L![/]")
    console.print(f"[bold yellow]📈 Traveled distance {distance}km![/]")
    time.sleep(1)
    console.print(Panel("[bold white]You are at a new airport. What would you like to do?[/]", title="📍 Arrival",
                        border_style="cyan", expand=False))

def display_error_message(message):
    console.print(Panel(f"[bold red][⛔] {message}[/]",
                        border_style="red", expand=False))
def display_success_message(message):
    console.print(Panel(f"[bold green][✅] {message}[/]",
                        border_style="green", expand=False))
def display_warning_message(message):
    console.print(Panel(f"[bold yellow][⚠️] {message}[/]",
                        border_style="yellow", expand=False))