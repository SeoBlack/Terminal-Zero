import os
import sqlite3

class DatabaseManager:
    def __init__(self, db_file="../database/database.db", schema_file="../config/schema.sql"):
        self.db_file = db_file
        self.schema_file = schema_file
        self.conn = None
        self.connect()

    def connect(self):
        """Connect to the SQLite database. If it doesn't exist, create and initialize it."""
        db_exists = os.path.exists(self.db_file)
        self.conn = sqlite3.connect(self.db_file)
        self.cursor = self.conn.cursor()

        if not db_exists:
            self.initialize_database()

    def initialize_database(self):
        """Initialize the database with schema.sql if it's a new database."""
        if os.path.exists(self.schema_file):
            with open(self.schema_file, "r") as f:
                schema = f.read()
                self.cursor.executescript(schema)
                self.conn.commit()
                print("Database initialized with schema.")
        else:
            print("Schema file not found. Database is empty.")

    def execute_query(self, query, params=()):
        """Execute a SQL query and return the result."""
        self.cursor.execute(query, params)
        self.conn.commit()
        return self.cursor.fetchall()

    def get_all_airports(self):
        query = "SELECT * FROM airports"
        return self.execute_query(query)

    def close(self):
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            print("Database connection closed.")