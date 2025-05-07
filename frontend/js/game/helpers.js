
export function getRandomAirport(airports) {
    return airports[Math.floor(Math.random() * airports.length)];
}

// Resources
export const eventTypes = [
    "fuel",
    "food",
    "weapon",
    "water",
    "damage",
    "huge_damage",
    "medicine"
];

export const storableItems = [
    "weapon",
    "water",
    "food",
    "fuel",
    "medicine"
];

// Maximum values
export const maxValues = {
    fuel: 2,
    medicine: 20,
    food: 10,
    weapon: 5,
    water: 5,
    tools: 1,
    damage: -10,
    huge_damage: -20
};

export const eventsWithTexts = [
    { fuel: "You found a fuel can!" },
    { damage: "You were attacked by zombies!" },
    { huge_damage: "You were attacked by a juggernaut!" },
    { food: "You found food supplies!" },
    { medicine: "You found medicines!" },
    { weapon: "You found weapons!" }
];

export function getHintEvents(country) {
    return [
        `I heard something about the safe airport, it's located in ${country}.`,
        `I overheard someone say that the safe airport is hidden somewhere near ${country}.`,
        `Rumor has it, the safe airport can be found somewhere around ${country}.`
    ];
}

export function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


export function getRandomColor(){
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5"];
    return colors[Math.floor(Math.random() * colors.length)];
}
