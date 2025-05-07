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
        self.cursor = None
        self.connect()


    def connect(self):
        try:
            print("Connecting to MariaDB...")
            self.conn = mariadb.connect(
                user=self.mariadb_user,
                password=self.mariadb_password,
                host=self.mariadb_host,
                port=int(self.mariadb_port) if self.mariadb_port else 3306,
                database=self.mariadb_database

            )
            self.cursor = self.conn.cursor()
            print("[+] Connected to MariaDB")
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

    def execute_query(self, query, params=()):
        """Execute a SQL query and return the result."""
        self.cursor.execute(query, params)
        self.conn.commit()
        if query.lower().startswith("select"):
            return self.cursor.fetchall()
        return None

    def get_all_airports(self):
        query = """SELECT a.id, a.name, a.latitude_deg, a.longitude_deg, a.iso_country, c.name as country_name
            FROM airports a
            LEFT JOIN country c ON a.iso_country = c.iso_country
        """
        return self.execute_query(query)
    def get_country_by_iso(self, iso_country):
        query = "SELECT name FROM country WHERE iso_country = ?"
        return self.execute_query(query, (iso_country,))
    def get_all_players(self):
        query = "SELECT * FROM players"
        return self.execute_query(query)
    def get_player_by_name(self, name):
        query = "SELECT * FROM players WHERE name = ?"
        return self.execute_query(query, (name,))

    def create_end_result(self, player_name, time_elapsed, has_won):
        query = "INSERT INTO game (player_name, time_elapsed, has_won) VALUES (?, ?, ?)"
        return self.execute_query(query, (player_name, time_elapsed, has_won))

    def add_new_player(self, name):
        query = "INSERT INTO players (name) VALUES (?)"
        self.execute_query(query, (name,))
        return name

    def get_end_results(self):
        query = "SELECT * FROM game"
        return self.execute_query(query)




    def close(self):
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            print("Database connection closed.")