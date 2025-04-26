import json

from flask import request, current_app

from flask import Blueprint, Response, json

player_bp = Blueprint('player', __name__)

@player_bp.route('/players', methods=['GET', 'POST'])
def players():
    # receive the db_manager from the app context
    db_manager = current_app.config['DB_MANAGER']
    if request.method == 'GET':
        # Handle GET request
        try:
            rows = db_manager.get_all_players()
            players = [{
                "name": row[0]
            } for row in rows]
            return Response(response=json.dumps(players, default=str),
                            mimetype='application/json',
                            status=200
                            )
        except Exception as e:
            print(f"Error: {e}")
            return Response(response=json.dumps({"error": str(e)}),
                            mimetype='application/json',
                            status=500
                            )
    elif request.method == 'POST':
        player_name = request.form['player_name']

        try:
            db_manager.add_new_player(player_name)
            return Response(response=json.dumps({"message": "Player created successfully"}),
                            mimetype='application/json',
                            status=201
                            )
        except Exception as e:
            print(f"Error: {e}")
            return Response(response=json.dumps({"error": str(e)}),
                            mimetype='application/json',
                            status=500
                            )