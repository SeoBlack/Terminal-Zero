import json

from flask import request, current_app

from flask import Blueprint, Response, json

end_results_bp = Blueprint('end_results', __name__)


@end_results_bp.route('/end_results', methods=['GET', 'POST'])
def end_results():

    # receive the db_manager from the app context
    db_manager = current_app.config['DB_MANAGER']
    if request.method == 'GET':
        # Handle GET request
        try:
            rows = db_manager.get_end_results()
            print(rows)
            end_results = [{
                "player_name": row[0], "time_elapsed": row[1], "has_won": row[2],
            } for row in rows]
            return Response(response=json.dumps(end_results, default=str),
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
        if not request.is_json:
            print("Request is not JSON")
            return Response(json.dumps({"error": "Request must be JSON"}), mimetype='application/json', status=400)

        data = request.get_json()
        try:
            username = data['username']
            time_elapsed = data['time_elapsed']
            has_won = data['has_won']
        except KeyError as e:
                 return Response(json.dumps({"error": f"Missing required field: {str(e)}"}), mimetype='application/json', status = 400)

        try:
            db_manager.create_end_result(username, time_elapsed, has_won)
            return Response(response=json.dumps({"message": "End result created successfully"}),
                            mimetype='application/json',
                            status=201
                            )
        except Exception as e:
            print(f"Error: {e}")
            return Response(response=json.dumps({"error": str(e)}),
                            mimetype='application/json',
                            status=500
                            )