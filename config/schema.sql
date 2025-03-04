-- Create the country table
CREATE TABLE country (
    iso_country VARCHAR(5) PRIMARY KEY, -- Assuming iso_code uniquely identifies a country
    name TEXT NOT NULL,
    continent TEXT
);

-- Create the airports table with a FOREIGN KEY referencing the country table
CREATE TABLE airports (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Changed indent to id for clarity
    name TEXT NOT NULL,
    lat DECIMAL(8,6),
    lng DECIMAL(9,6),
    iso_country VARCHAR(5), -- iso_country field
    FOREIGN KEY (iso_country) REFERENCES country (iso_country) -- Define the FK relationship
);

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    health INTEGER DEFAULT 100,
    fuel INTEGER DEFAULT 50
);
-- Inventory Table
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    player_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);

-- Insert sample data into the country table
INSERT INTO country (iso_country, name, continent)
VALUES ('US', 'United States', 'North America'),
       ('CA', 'Canada', 'North America'),
       ('FR', 'France', 'Europe'),
       ('JP', 'Japan', 'Asia');

-- Insert sample data into the airports table
INSERT INTO airports ( name, lat, lng, iso_country)
VALUES ( 'Los Angeles International Airport', 33.9425, -118.4081, 'US'),
       ( 'Toronto Pearson International Airport', 43.6777, -79.6248, 'CA'),
       ( 'Bordeaux–Mérignac Airport', 44.8283, -0.7156, 'FR'),
       ( 'Narita International Airport', 35.7633, 140.3867, 'JP');

-- Insert sample data into the players table
INSERT INTO players (name, health, fuel)
VALUES ('Player1', 100, 50),
       ('Player2', 80, 30),
       ('Player3', 120, 70),
       ('Player4', 60, 40);

-- Insert sample data into the inventory table
INSERT INTO inventory (player_id, item_name, quantity)
VALUES (1, 'sword', 1),
       (1, 'shield', 1),
       (1, 'health_potion', 3),
       (2, 'pistol', 1),
       (2, 'ammo', 20),
       (2, 'bandage', 2),
       (3, 'axe', 1),
       (3, 'rope', 5),
       (3, 'map', 1),
       (4, 'torch', 2),
       (4, 'water bottle', 3),
       (4, 'canned food', 4);
