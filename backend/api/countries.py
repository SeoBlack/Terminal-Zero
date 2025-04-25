import json
from __main__ import  app, db_manager

from flask import Response


@app.route('/countries', methods=['GET'])
def countries():
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