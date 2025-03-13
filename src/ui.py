import time
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

from config.settings import SETTINGS

# Initialize Rich console
console = Console()

def slow_print(text, style="bold red", delay=SETTINGS["animation_delay_s"]):
    """Prints text with a slight delay while preserving rich styling."""
    for char in text:
        console.print(f"[{style}]{char}[/]", end="", highlight=False)
        time.sleep(delay/20)
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
    table.add_column("Tekijät", style="bold white", justify="center")

    table.add_row(f"[bold red]Soreen Oraibi[/]")
    table.add_row(f"[bold yellow]Nikita Soo[/]")
    table.add_row(f"[bold blue]Isla Mannerheimo[/]")
    table.add_row(f"[bold white]Alabass Alkhrsany[/]")
    console.print(table)


def display_intro():
    """Displays the game intro with dramatic effect."""
    display_ascii_art()

    slow_print("[⚠️] Maailma selaisena kuin sen tunnemme...on poissa.", "bold red")
    time.sleep(SETTINGS["animation_delay_s"])

    slow_print("[⚠️] Tappava virus on pyyhkäissyt koko planeetan ja muuttaneet ihmiset lihaa syöviksi hirviöiksi.", "bold yellow")
    slow_print("[⚠️] Viimeiset turvalliset paikat ovat linnoitetut lentokentät, joissa tartunnan saaneet pidetään loitolla", "bold cyan")

    time.sleep(SETTINGS["animation_delay_s"])

    slow_print("[⚠️] Olet yksi viimeisistä selviytyjistä.", "bold white")
    slow_print("[⚠️] Ainoa toivosi on matkustaa lentokenttien välillä, etsiä tarvikkeita ja pysyä hengissä.", "bold green")

    time.sleep(SETTINGS["animation_delay_s"])

    slow_print("[⚠️] Mutta aika on loppumassa...", "bold red")
    slow_print("[⚠️] Zombeja on kaikkialla. Tarvikkeet ovat vähissä.", "bold yellow")
    slow_print("[⚠️] Eikä kaikkiin selviytyjiin voi luottaa.", "bold magenta")

    time.sleep(SETTINGS["animation_delay_s"])

    slow_print("[⚠️] Pääsetkö turvapaikkaan vai tuletko yhdestä tartunnan saaneista?", "bold cyan")

    console.print("\n[bold green]Tervetuloa TERMINAL ZERO.[/]")
    time.sleep(SETTINGS["animation_delay_s"])

def display_status(player):
    """Displays the player's current status in a clean, structured format."""
    table = Table(title=f"[bold cyan]📊 NYKYINEN TILA: {player.name}[/]", style="cyan")
    table.add_column("Ominaisuus", style="bold white", justify="center")
    table.add_column("Arvo", style="bold yellow", justify="center")

    table.add_row("🩸 Terveys", f"[bold red]{player.health}/100[/]")
    table.add_row("⛽ Polttoaine", f"[bold yellow]{player.fuel} L[/]")
    table.add_row("📍 Sijainti", f"[bold blue]{player.location.name}[/]")
    table.add_row("🌐 Maa",f"[bold green]{player.location.country}[/]")
    table.add_row("🎒 Inventaario", f"[bold yellow]{sum(player.inventory.items.values())} items[/]")

    console.print(table)

def display_inventory(inventory):
    """Displays the player's inventory in a clean, structured table format."""
    if not inventory:
        console.print(Panel("[bold red]Tyhjä inventaario[/]", title="🎒 Inventaario", border_style="red", expand=False))
        return

    table = Table(title="🎒 Inventaario", style="bold green")
    table.add_column("Tavara", style="bold white", justify="left")
    table.add_column("Määrä", style="bold yellow", justify="center")

    for item_name, quantity in inventory.items.items():
        table.add_row(item_name, f"[bold yellow]{quantity}[/]")

    console.print(table)

def display_menu(actions):
    """Show the main menu options in a visually appealing way."""
    console.print(Panel("[bold green]PÄÄVALIKKO[/]", border_style="green", expand=False))
    for i, option in enumerate(actions, start=1):
        if option == "tutki":
            console.print(f"[bold green][{i}] Tutki lentokenttää 🏢 (tutki)[/]")
        elif option == "siirry":
            console.print(f"[bold cyan][{i}] Siirry toiseen sijaintiin ✈️  (siirry)[/]")
        elif option == "inventaario":
            console.print(f"[bold yellow][{i}] Tarkista inventaario 🎒  (inventaario)[/]")
        elif option == "tila":
            console.print(f"[bold white][{i}] Tarkista nykyinen tila 📈  (tila)[/]")
        elif option == "käytä":
            console.print(f"[bold blue][{i}] Käytä inventaario tavaraa 🪴  (käytä)[/]")
        elif option == "lopeta":
            console.print(f"[bold red][{i}] Lopeta ❌  (lopeta)[/]")


def animate_travel(destination, distance , fuel):
    """Displays an animated transition when moving to a new location."""
    console.print("\n[bold cyan]✈️ Valmistautuminen lähtöön...[/]")
    time.sleep(SETTINGS["animation_delay_s"])
    console.print("[bold yellow]🚀 Nousu...[/]")
    time.sleep(SETTINGS["animation_delay_s"])
    console.print(f"[bold blue]🌍 Lentää kohteeseen {destination}...[/]")
    time.sleep(SETTINGS["animation_delay_s"])
    console.print(f"[bold green]🛬 Olet saapunut paikkaan {destination}![/]")
    time.sleep(SETTINGS["animation_delay_s"])
    console.print(f"[bold yellow]⛽ Polttoainetta käytetty {fuel}L![/]")
    console.print(f"[bold yellow]📈 Matkustettu etäisyys {distance}km![/]")
    time.sleep(SETTINGS["animation_delay_s"])
    console.print(Panel("[bold white]Olet uudella lentokentällä. Mitä haluaisit tehdä?[/]", title="📍 Saapuminen",
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


# self.ident = ident
# self.name = name
# self.events = events or []
# self.danger_level = danger_level or random.randint(1, SETTINGS.get("max_danger_level"))
# self.lat = lat
# self.lng = lng
# self.country = country

def display_airports(airports, current_location):
    table = Table(title="🛫 Lähellä olevat lentokentät", style="bold cyan")
    table.add_column("ID", style="bold white", justify="center")
    table.add_column("Nimi", style="bold yellow", justify="center")
    table.add_column("Maa", style="bold green", justify="center")
    table.add_column("Etäisyys", style="bold blue", justify="center")
    table.add_column("Vaaran taso", style="bold red", justify="center")
    table.add_column("Koordinaatit", style="bold magenta", justify="center")
    table.add_column("Tutkittu", style="bold yellow", justify="center")
    for airport in airports:
        table.add_row(
            str(airport.ident),
            airport.name,
            airport.country,
            f'{airport.calculate_distance(current_location)}km',
            str(airport.danger_level),
            f"[bold yellow]{airport.lat},{airport.lng}[/]",
            str(airport.is_explored)
        )
    console.print(table)


def display_win_screen(completion_time, player):
    """Displays the victory screen with a message and Terminal Zero ASCII in green."""

    # Terminal Zero ASCII Art in Green
    ascii_art = """[bold green]
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
    # Clear screen and display win screen
    console.clear()
    console.print(Panel(ascii_art, title="[bold green]TERMINAL ZERO[/]", border_style="green", expand=False))
    time.sleep(SETTINGS["animation_delay_s"])

    win_message = Text(f"🎉 Onnittelut, {player.name}! 🎉", style="bold green")

    console.print(Panel(win_message, border_style="green", title="🏆 Voitto saavutettu! 🏆", padding=(1, 2), expand=False))
    time.sleep(SETTINGS["animation_delay_s"])
    slow_print("Kaikista vastoinkäymisistä huolimatta olet selviytynyt kaaoksen läpi, ", style="bold white")
    slow_print("taistellut kuolleiden kanssa, ", style="bold red")
    slow_print("ja kestänyt kuolevan maailman vaarat.\n\n", style="bold white")
    time.sleep(SETTINGS["animation_delay_s"])
    slow_print("Olet viimein saavuttanut viimeisen ", style="bold white")
    slow_print("TURVALLISEN LENTOKENTÄN ✈️ ", style="bold green")
    slow_print("- turvapaikka, jossa ihmiskunnan viimeiset selviytyjät kokoontuvat toivon keskelle.\n\n", style="bold white")
    time.sleep(SETTINGS["animation_delay_s"])

    slow_print("Painajainen on ohi... ", style="bold magenta")
    slow_print("toistaiseksi.\n\n", style="bold white")
    time.sleep(SETTINGS["animation_delay_s"])

    slow_print("Autatko ", style="bold white")
    slow_print("rakentamaan sivilisaation uudestaan", style="bold cyan")
    slow_print("vai palaatko ulkomaailmaan ", style="bold white")
    slow_print("pelastaakseen ne, jotka ovat edelleen loukussa?", style="bold yellow")
    time.sleep(SETTINGS["animation_delay_s"])

    win_status_table = Table(title="📈 Pelaajatiedot", style="bold cyan")

    win_status_table.add_row(
        "Nimi",
        player.name
    )
    win_status_table.add_row(
        "Polttoaine",
        str(player.fuel)
    )
    win_status_table.add_row(
        "Inventaario tavarat",
        str(sum(player.inventory.items.values()))
    )
    win_status_table.add_row(
        "Kulunut aika",
        str(completion_time)
    )
    console.print(win_status_table)