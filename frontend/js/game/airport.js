import {SETTINGS} from "./settings.js";
import {eventsWithTexts, maxValues} from "./helpers.js";
import Event, {jsonifyEvent} from "./events.js";
import {getWeatherData} from "../components/openWeatherMap.js";

export default class Airport {
    constructor(id, name, events, dangerLevel = 0, lat = 0, lng = 0, country = "", isExplored = false, isSafe = false, weather = null) {
        /** Initialize an airport with resources and danger level. */
        this.id = id;
        this.name = name;
        this.events = events;
        this.dangerLevel = dangerLevel;
        this.lat = lat;
        this.lng = lng;
        this.country = country;
        this.isExplored = isExplored;
        this.isSafe = isSafe;
        this.weather = weather;
        if (!this.events) {
            this.generateEvents();
        }


    }
    generateEvents() {
        this.events = [];
        /** Generate a random list of events for the airport. */
        const randomEvents = Array.from({ length: Math.floor(Math.random() * 4) }, () => {
            return eventsWithTexts[Math.floor(Math.random() * eventsWithTexts.length)];
        });

        randomEvents.forEach(event => {
            for (const [key, description] of Object.entries(event)) {
                // Dangerous places might have high damages but also high rewards.
                const effect = {
                    [key]: Math.round(Math.random() * maxValues[key]) * this.dangerLevel
                };
                this.events.push(new Event(description, effect));
            }
        });
    }

    calculateDistance(destination) {
        const toRadians = degrees => degrees * (Math.PI / 180);

        const earthRadiusKm = 6371;
        const dLat = toRadians(destination.lat - this.lat);
        const dLng = toRadians(destination.lng - this.lng);

        const lat1 = toRadians(this.lat);
        const lat2 = toRadians(destination.lat);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(earthRadiusKm * c * 100) / 100; // Round to 2 decimal places
    }
}


export function jsonifyAirport(airport) {
    /** Convert airport object to string. */
    return {
        id: airport.id,
        name: airport.name,
        events: airport.events.map(event => jsonifyEvent(event)),
        dangerLevel: airport.dangerLevel,
        lat: airport.lat,
        lng: airport.lng,
        country: airport.country,
        isExplored: airport.isExplored,
        isSafe: airport.isSafe,
        weather: airport.weather

    };
}