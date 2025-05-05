
export function playSoundEffect(soundEffect) {
    /** Play a sound effect. */

    const audio = new Audio(soundEffect);
        audio.play().catch(error => {
        console.warn(`Failed to play sound effect: ${soundEffect}`, error);
    });
        return audio;
}


export const soundEffects = {
    "RADAR": "../../assets/audio/radar.mp3",
    "SPAWN": "../../assets/audio/spawn.mp3",
    "EXPLORE": "../../assets/audio/searching.mp3",
    "FLY": "../../assets/audio/flying.mp3",
    "CLICK": "../../assets/audio/click.mp3",
    "ATTACK": "../../assets/audio/shooting.mp3",
    "ZOMBIE": "../../assets/audio/zombie.mp3",
    "SEARCH": "../../assets/audio/searching.mp3",
    "FOUND": "../../assets/audio/found.mp3",
    "TRAVELER":[
        "../../assets/audio/male-survivor.mp3",
        "../../assets/audio/female-survivor.mp3"
    ],
    "water": "../../assets/audio/drinking.mp3",
    "food": "../../assets/audio/eating.mp3",
    "fuel": "../../assets/audio/fuel.mp3",
    "medicine": "../../assets/audio/medicine.mp3",
    "ERROR": "../../assets/audio/error.mp3",
    "ZOMBIE_START": "../../assets/audio/zombie-start.mp3",
    'CINEMATIC': "../../assets/audio/cinematic-hit.mp3",


}