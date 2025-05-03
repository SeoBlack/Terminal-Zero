 const audio = new Audio();
export function playSoundEffect(soundEffect) {
    /** Play a sound effect. */

    audio.src = soundEffect
        audio.play().catch(error => {
        console.warn(`Failed to play sound effect: ${soundEffect}`, error);
    });
}


export const soundEffects = {
    "RADAR": "../../assets/audio/radar.mp3",
    "SPAWN": "../../assets/audio/spawn.mp3",
    "EXPLORE": "../../assets/audio/explore.mp3",
    "FLY": "../../assets/audio/flying.mp3",

}