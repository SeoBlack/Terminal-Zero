import json

from flask import request, current_app

from flask import Blueprint, Response, json

player_bp = Blueprint('player', __name__)

@player_bp.route('/players', methods=['GET', 'POST'])
def players():
    db_manager = current_app.config['DB_MANAGER']
    if request.method == 'GET':
        try:
            rows = db_manager.get_all_players()
            players = [{"name": row[0]} for row in rows]
            return Response(json.dumps(players, default=str), mimetype='application/json', status=200)
        except Exception as e:
            return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)

    if request.method == 'POST':
        if not request.is_json:
            return Response(json.dumps({"error": "Request must be JSON"}), mimetype='application/json', status=400)
        try:
            db_manager.add_new_player(request.get_json()['username'])
            return Response(json.dumps({"message": "Player created successfully"}), mimetype='application/json', status=201)
        except Exception as e:
            status = 409 if "Duplicate entry" in str(e) else 500
            return Response(json.dumps({"error": str(e) if status == 500 else "Player already exists"}), mimetype='application/json', status=status)


# get user by username
@player_bp.route('/players/<username>', methods=['GET'])
def get_player(username):
    db_manager = current_app.config['DB_MANAGER']
    try:
        rows = db_manager.get_all_players()
        players = [{"name": row[0]} for row in rows]
        player = next((player for player in players if player["name"] == username), None)
        if player:
            return Response(json.dumps(player, default=str), mimetype='application/json', status=200)
        else:
            return Response(json.dumps({"error": "Player not found"}), mimetype='application/json', status=404)
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), mimetype='application/json', status=500)