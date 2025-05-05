from flask import Flask
from backend.database.db_manager import DatabaseManager
import os
from dotenv import load_dotenv

# Import and register blueprints
from api.airports import airports_bp
from api.countries import countries_bp
from api.end_results import end_results_bp
from api.player import player_bp
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()



def create_app():

    app = Flask(__name__)
    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    with app.app_context():
        # Initialize the database manager
        db_manager = DatabaseManager()
        app.config['DB_MANAGER'] = db_manager
    # include the routes from the blueprints(it's just a way to organize the code)

    app.register_blueprint(airports_bp)
    app.register_blueprint(countries_bp)
    app.register_blueprint(end_results_bp)
    app.register_blueprint(player_bp)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(
        host=os.getenv('FLASK_RUN_HOST') or '127.0.0.1',
        port=int(os.getenv('FLASK_RUN_PORT')) or 5000,
    )