CREATE TABLE airports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    resources TEXT,
    danger_level INTEGER DEFAULT 0
);

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    health INTEGER DEFAULT 100,
    fuel INTEGER DEFAULT 50,
    inventory TEXT
);
