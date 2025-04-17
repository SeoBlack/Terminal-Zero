import os
import sys
import mariadb# importing necessary functions from dotenv library
from dotenv import load_dotenv, dotenv_values
# loading variables from .env file
load_dotenv()

class DatabaseManager:
    def __init__(self, db_file=None, schema_file=None):
        self.mariadb_user = os.getenv("MARIADB_USER")
        self.mariadb_password = os.getenv("MARIADB_PASSWORD")
        self.mariadb_host = os.getenv("MARIADB_HOST")
        self.mariadb_port = os.getenv("MARIADB_PORT")
        self.mariadb_database = os.getenv("MARIADB_DATABASE")
        self.conn = None
        self.connect()
        self.cursor = None

    def connect(self):
        try:
            self.conn = mariadb.connect(
                user=self.mariadb_user,
                password=self.mariadb_password,
                host=self.mariadb_host,
                port=self.mariadb_port,
                database=self.mariadb_database

            )
            self.cursor = self.conn.cursor()
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

    def execute_query(self, query, params=()):
        """Execute a SQL query and return the result."""
        self.cursor.execute(query, params)
        self.conn.commit()
        return self.cursor.fetchall()

    def get_all_airports(self):
        query = "SELECT * FROM airports"
        return self.execute_query(query)
    def get_country_by_code(self, code):
        query = "Select name from country where iso_country = ?"
        result = self.execute_query(query, (code,))
        if result and len(result) > 0:
            return result[0][0]
        return "Unknown"  # or raise a specific exception
    def create_new_game_record(self, player_id, time_elapsed, has_won):
        query = "INSERT INTO game (player_id, time_elapsed, has_won) VALUES (?, ?, ?)"
        return self.execute_query(query, (player_id, time_elapsed, has_won))

    def add_new_player(self, name, health, fuel, location_id):
        query = "INSERT INTO players (name, health, fuel, location_id) VALUES (?,?,?,?)"
        self.execute_query(query, (name,health,fuel, location_id))
        return self.cursor.lastrowid
    def update_player(self, player_id, health, fuel, location_id):
        query = "UPDATE players SET ( health, fuel, location_id) = (?,?,?) WHERE id = ?"
        return self.execute_query(query, ( health, fuel, location_id,player_id))
    def get_end_status(self):
        query = """
                    SELECT 
                players.name AS player_name,
                game.time_elapsed,
                game.has_won,
                airports.name AS current_airport
            FROM 
                players
            LEFT JOIN 
                game ON players.id = game.player_id
            LEFT JOIN 
                airports ON players.location_id = airports.id;
        """
        return self.execute_query(query)




    def close(self):
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            print("Database connection closed.")