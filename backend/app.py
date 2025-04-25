from flask import Flask
from flask import render_template

from backend.database.db_manager import DatabaseManager

app = Flask(__name__)
db_manager = DatabaseManager()
# just separating the routes for better maintenance
from api import airports, countries, end_results, player

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()