import json
from flask import Blueprint, Response, json, current_app

countries_bp = Blueprint('countries', __name__)
# receive the db_manager from the app context
@countries_bp.route('/countries', methods=['GET'])
def countries():
    db_manager = current_app.config['DB_MANAGER']
    try:
        rows = db_manager.get_all_countries()
        print(rows)
        countries = [{
            "iso_country":row[0], "name":row[1], "continent":row[2],
        } for row in rows]
        return Response(response=json.dumps(countries, default=str),
                        mimetype='application/json',
                        status=200
                        )
    except Exception as e:
        print(f"Error: {e}")
        return Response(response=json.dumps({"error": str(e)}),
                        mimetype='application/json',
                        status=500
                        )