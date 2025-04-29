import json
from flask import Blueprint, Response, json, current_app
airports_bp = Blueprint('airports', __name__)

@airports_bp.route('/airports', methods=['GET'])
def airports():

    db_manager = current_app.config['DB_MANAGER']

    try:
        rows = db_manager.get_all_airports()
        airports = [{
            "id":row[0], "name":row[1], "latitude_deg":row[2], "longitude_deg":row[3], "iso_country":row[4]
        } for row in rows]
        return Response(response=json.dumps(airports, default=str),
                        mimetype='application/json',
                        status=200
                        )
    except Exception as e:
        print(f"Error: {e}")
        return Response(response=json.dumps({"error": str(e)}),
                        mimetype='application/json',
                        status=500
                        )