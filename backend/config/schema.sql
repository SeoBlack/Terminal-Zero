CREATE TABLE country (
    iso_country VARCHAR(5) PRIMARY KEY,
    name TEXT NOT NULL,
    continent TEXT
);

CREATE TABLE airports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    latitude_deg DECIMAL(8,6),
    longitude_deg DECIMAL(9,6),
    iso_country VARCHAR(5),
    FOREIGN KEY (iso_country) REFERENCES country (iso_country)
);

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    health INTEGER DEFAULT 100,
    fuel INTEGER DEFAULT 50,
    location_id INTEGER,
    FOREIGN KEY (location_id) REFERENCES  airports(id)
);
CREATE TABLE game (
    game_id INTEGER PRIMARY KEY  AUTOINCREMENT,
    player_id INT NOT NULL,
    time_elapsed DATETIME,
    has_won BOOLEAN,
    FOREIGN KEY (player_id) REFERENCES players(id)
);
INSERT INTO country (iso_country, name, continent)
VALUES ('FI', 'Finland', 'Europe'),
       ('EE', 'Estonia', 'Europe'),
       ('LV', 'Latvia', 'Europe'),
       ('BY', 'Belarus', 'Europe'),
       ('FR', 'France', 'Europe'),
       ('LT', 'Lithuania', 'Europe'),
       ('AL', 'Albania', 'Europe'),
       ('AT', 'Austria', 'Europe'),
       ('DE', 'Germany', 'Europe'),
       ('ES', 'Spain', 'Europe'),
       ('IT', 'Italy', 'Europe'),
       ('NL', 'Netherlands', 'Europe'),
       ('BE', 'Belgium', 'Europe'),
       ('PL', 'Poland', 'Europe'),
       ('CZ', 'Czech Republic', 'Europe'),
       ('SK', 'Slovakia', 'Europe'),
       ('PT', 'Portugal', 'Europe'),
       ('SE', 'Sweden', 'Europe'),
       ('NO', 'Norway', 'Europe'),
       ('DK', 'Denmark', 'Europe'),
       ('IE', 'Ireland', 'Europe'),
       ('CH', 'Switzerland', 'Europe'),
       ('GR', 'Greece', 'Europe'),
       ('HU', 'Hungary', 'Europe');


INSERT INTO airports ( name, latitude_deg, longitude_deg, iso_country)
VALUES ('Helsinki-Vantaa Airport', 60.3172, 24.9633, 'FI'), --Finland
       ('Lennart Meri Tallinn Airport', 59.4133, 24.8328, 'EE'),  -- Estonia
       ('Riga International Airport', 56.9236, 23.9711, 'LV'),  -- Latvia
       ('Minsk National Airport', 53.8825, 28.0308, 'BY'),  -- Belarus
       ('Charles de Gaulle Airport', 49.0097, 2.5479, 'FR'),  -- France
       ('Vilnius International Airport', 54.6341, 25.2858, 'LT'),  -- Lithuania
       ('Tirana International Airport', 41.4147, 19.7206, 'AL'),  -- Albania
       ('Vienna International Airport', 48.1103, 16.5697, 'AT'),  -- Austria
       ('Frankfurt Airport', 50.0333, 8.5706, 'DE'),  -- Germany
       ('Adolfo Suárez Madrid-Barajas Airport', 40.4719, -3.5626, 'ES'),  -- Spain
       ('Rome–Fiumicino International Airport', 41.8003, 12.2389, 'IT'),  -- Italy
       ('Amsterdam Schiphol Airport', 52.3105, 4.7683, 'NL'),  -- Netherlands
       ('Brussels Airport', 50.9010, 4.4844, 'BE'),  -- Belgium
       ('Warsaw Chopin Airport', 52.1657, 20.9671, 'PL'),  -- Poland
       ('Václav Havel Airport Prague', 50.1008, 14.2600, 'CZ'),  -- Czech Republic
       ('Bratislava Airport', 48.1702, 17.2127, 'SK'),  -- Slovakia
       ('Humberto Delgado Airport (Lisbon Airport)', 38.7742, -9.1342, 'PT'),  -- Portugal
       ('Stockholm Arlanda Airport', 59.6519, 17.9186, 'SE'),  -- Sweden
       ('Oslo Gardermoen Airport', 60.1939, 11.1004, 'NO'),  -- Norway
       ('Copenhagen Airport', 55.6181, 12.6561, 'DK'),  -- Denmark
       ('Dublin Airport', 53.4264, -6.2499, 'IE'),  -- Ireland
       ('Zurich Airport', 47.4647, 8.5492, 'CH'),  -- Switzerland
       ('Athens International Airport', 37.9364, 23.9475, 'GR'),  -- Greece
       ('Budapest Ferenc Liszt International Airport', 47.4369, 19.2556, 'HU');  -- Hungary
