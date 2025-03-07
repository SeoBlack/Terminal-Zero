# Terminal Zero - A Survival Game

## 📌 Overview
Terminal Zero is a **text-based survival game** where players navigate through airports in a world overrun by a zombie virus. The goal is to **find resources, manage supplies, avoid zombies, and reach the final safe zone** before it's too late!

## 🎮 Gameplay Features
- **Turn-based system:** Players take actions each turn, including searching for supplies, resting, or fighting zombies.
- **Random events:** Airports may contain valuable resources, hostile survivors, or hordes of zombies.
- **Flight system:** Manage fuel and aircraft condition to travel between locations.
- **Inventory management:** Limited carrying capacity forces strategic decisions.
- **Survivor encounters:** NPCs may offer help, trade, or betrayal.

## 🔧 Installation & Setup
### Prerequisites
- Python 3.x
- SQLite3 (for database management)
### [!] NOTE
if you are using Pycharm, make sure to enable terminal emulator to activate the colored output:
- 1. ![img.png](img.png)
- 2. ![img_1.png](img_1.png)

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/TerminalZero.git
   cd TerminalZero
   ```
2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use 'venv\Scripts\activate'
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Initialize the database:**
   ```bash
   python database/db_manager.py
   ```
5. **Run the game:**
   ```bash
   python src/main.py
   ```

## 📂 Project Structure
```
TerminalZero/
│── assets/                  # ASCII art, future sound/image assets
│── database/                # Database schema & manager
│── src/                     # Game logic
│   ├── main.py              # Entry point
│   ├── game.py              # Core game loop
│   ├── player.py            # Player attributes & actions
│   ├── airport.py           # Airport interactions
│   ├── events.py            # Random encounters
│   ├── inventory.py         # Inventory system
│   ├── ui.py                # User interface (text-based)
│── tests/                   # Unit tests
│── config/                  # Game settings
│── logs/                    # Game logs
│── README.md                # Documentation
│── requirements.txt         # Dependencies
│── schema.sql               # Database schema
```

## 🚀 Roadmap & Future Features
- [ ] Advanced AI-driven NPC behavior
- [ ] More diverse event system (weather changes, distress calls, etc.)
- [ ] Graphical UI (Pygame, Web UI, or TUI-based)

## 🤝 Contributions
Pull requests are welcome! Please **open an issue** to discuss any major changes before submitting a PR.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

