import json
from __main__ import  app, db_manager

from flask import Response, request


@app.route('/players', methods=['GET', 'POST'])
def players():
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