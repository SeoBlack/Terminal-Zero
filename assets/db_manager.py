#Here comes all the db related logic
import sqlite3

DB_PATH = "database/terminal_zero.db"

def get_db_connection():
    """Establish a connection to the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def initialize_database():
    """Initialize the database with required tables."""
    with open("database/schema.sql", "r") as f:
        schema = f.read()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.executescript(schema)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    initialize_database()
    print("Database initialized successfully!")