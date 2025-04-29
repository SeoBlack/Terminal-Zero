
function getRandomAirport(airports) {
    return airports[Math.floor(Math.random() * airports.length)];
}

// Resources
const eventTypes = [
    "fuel",
    "food",
    "weapon",
    "water",
    "damage",
    "huge_damage",
    "medicine"
];

const storableItems = [
    "weapon",
    "water",
    "food",
    "fuel",
    "medicine"
];

// Maximum values
const maxValues = {
    fuel: 2,
    medicine: 20,
    food: 10,
    weapon: 5,
    water: 5,
    tools: 1,
    damage: -10,
    huge_damage: -20
};

const eventsWithTexts = [
    { fuel: "You found a fuel can!" },
    { damage: "You were attacked by zombies!" },
    { huge_damage: "You were attacked by a juggernaut!" },
    { food: "You found food supplies!" },
    { medicine: "You found medicines!" },
    { weapon: "You found weapons!" }
];

function getHintEvents(country) {
    return [
        `I heard something about the safe airport, it's located in ${country}.`,
        `I overheard someone say that the safe airport is hidden somewhere near ${country}.`,
        `Rumor has it, the safe airport can be found somewhere around ${country}.`
    ];
}

function formatTime(seconds) {
    seconds = seconds % (24 * 3600);
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

module.exports = {
    getRandomAirport,
    eventTypes,
    storableItems,
    maxValues,
    eventsWithTexts,
    getHintEvents,
    formatTime
};