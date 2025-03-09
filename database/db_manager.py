import os
import sqlite3

class DatabaseManager:
    def __init__(self, db_file=None, schema_file=None):
        # Get the directory of this script file
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        # Set default paths relative to the base directory
        self.db_file = db_file or os.path.join(base_dir, "database", "database.db")
        self.schema_file = schema_file or os.path.join(base_dir, "config", "schema.sql")
        self.conn = None
        self.connect()

    def connect(self):
        """Connect to the SQLite database. If it doesn't exist, create and initialize it."""
        db_exists = os.path.exists(self.db_file)

        try:
            self.conn = sqlite3.connect(self.db_file)
            self.cursor = self.conn.cursor()
            if not db_exists:
                self.initialize_database()
        except sqlite3.Error as e:
            print(f"Database connection error: {e}")
            self.conn = None

    def initialize_database(self):
        """Initialize the database with schema.sql if it's a new database."""
        if os.path.exists(self.schema_file):
            try:
                with open(self.schema_file, "r") as f:
                    schema = f.read()
                    self.cursor.executescript(schema)
                    self.conn.commit()
                    print("Database initialized with schema.")
            except sqlite3.Error as e:
                print(f"Database initialization error: {e}")
            except IOError as e:
                print(f"Error reading schema file: {e}")
        else:
            print("Schema file not found. Database is empty.")

    def execute_query(self, query, params=()):
        """Execute a SQL query and return the result."""
        self.cursor.execute(query, params)
        self.conn.commit()
        # Only fetch results for SELECT queries
        if query.strip().upper().startswith("SELECT"):
            return self.cursor.fetchall()
        return None

    def get_all_airports(self):
        query = "SELECT * FROM airports"
        return self.execute_query(query)
    def get_country_by_code(self, code):
        query = "Select name from country where iso_country = ?"
        result = self.execute_query(query, (code,))
        if result and len(result) > 0:
            return result[0][0]
        return "Unknown"  # or raise a specific exception

    def close(self):
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            print("Database connection closed.")