-- init_database_mariadb.sql

CREATE TABLE country (
    iso_country VARCHAR(5) PRIMARY KEY,
    name TEXT NOT NULL,
    continent VARCHAR(100)
);

CREATE TABLE airports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude_deg DECIMAL(9,6),
    longitude_deg DECIMAL(9,6),
    iso_country VARCHAR(5),
    FOREIGN KEY (iso_country) REFERENCES country (iso_country)
);

CREATE TABLE players (
    name VARCHAR(255) NOT NULL PRIMARY KEY
);


CREATE TABLE game (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    time_elapsed VARCHAR(255) NOT NULL,
    has_won BOOLEAN,
    FOREIGN KEY (player_name) REFERENCES players(name)
);

-- Insert countries
INSERT INTO country (iso_country, name, continent) VALUES
('FI', 'Finland', 'Europe'),
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

-- Insert airports
INSERT INTO airports (name, latitude_deg, longitude_deg, iso_country) VALUES
('Helsinki-Vantaa Airport', 60.3172, 24.9633, 'FI'),
('Lennart Meri Tallinn Airport', 59.4133, 24.8328, 'EE'),
('Riga International Airport', 56.9236, 23.9711, 'LV'),
('Minsk National Airport', 53.8825, 28.0308, 'BY'),
('Charles de Gaulle Airport', 49.0097, 2.5479, 'FR'),
('Vilnius International Airport', 54.6341, 25.2858, 'LT'),
('Tirana International Airport', 41.4147, 19.7206, 'AL'),
('Vienna International Airport', 48.1103, 16.5697, 'AT'),
('Frankfurt Airport', 50.0333, 8.5706, 'DE'),
('Adolfo Suárez Madrid-Barajas Airport', 40.4719, -3.5626, 'ES'),
('Rome–Fiumicino International Airport', 41.8003, 12.2389, 'IT'),
('Amsterdam Schiphol Airport', 52.3105, 4.7683, 'NL'),
('Brussels Airport', 50.9010, 4.4844, 'BE'),
('Warsaw Chopin Airport', 52.1657, 20.9671, 'PL'),
('Václav Havel Airport Prague', 50.1008, 14.2600, 'CZ'),
('Bratislava Airport', 48.1702, 17.2127, 'SK'),
('Humberto Delgado Airport (Lisbon Airport)', 38.7742, -9.1342, 'PT'),
('Stockholm Arlanda Airport', 59.6519, 17.9186, 'SE'),
('Oslo Gardermoen Airport', 60.1939, 11.1004, 'NO'),
('Copenhagen Airport', 55.6181, 12.6561, 'DK'),
('Dublin Airport', 53.4264, -6.2499, 'IE'),
('Zurich Airport', 47.4647, 8.5492, 'CH'),
('Athens International Airport', 37.9364, 23.9475, 'GR'),
('Budapest Ferenc Liszt International Airport', 47.4369, 19.2556, 'HU');
