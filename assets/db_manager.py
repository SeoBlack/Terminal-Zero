#Here comes all the db related logic
import mysql.connector
import random

yhteys = mysql.connector.connect(
        host='127.0.0.1',
        port=3306,
        database='flight_game',
        user='root',
        password='Kirjolohi',
        autocommit=True,
        charset='utf8mb4',
        collation='utf8mb4_general_ci'
    )

def get_all_airports():
    cursor = yhteys.cursor()
    sql = """
        SELECT iso_country, name
        FROM airport
        WHERE continent LIKE '%EU%' AND
        type = 'large_airport' GROUP BY iso_country ORDER BY iso_country, name;
        """
    cursor.execute(sql)

    # Haetaan tulos
    tulos = cursor.fetchall()
    return tulos

if __name__ == "__main__":
    print(get_all_airports())
    print("Database initialized successfully!")