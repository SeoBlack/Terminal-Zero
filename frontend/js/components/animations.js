//scan animation
import {playSoundEffect, soundEffects} from "./sound_effects.js";

export function animateScan(){

    // play sound effect
    playSoundEffect(soundEffects.RADAR);
        const ring = document.querySelector('.player-ring');
    if (ring) ring.style.animation = 'scan 2s linear infinite';

    return new Promise((resolve) => {
        setTimeout(() => {
            const playerEl = document.querySelector('.player-ring');
            if (playerEl) {
                playerEl.style.animation = 'scan 2s linear infinite';
            }
            resolve();
        }, 2000);
    });

}

export function animateTravel(endAirport, playerMarker) {
    // Get current position

    // play sound effect
    playSoundEffect(soundEffects.FLY);
    const startLatLng = playerMarker.getLatLng();
    console.log(startLatLng);
    console.log(endAirport);


    // Calculate bearing (direction)
    const bearing = getBearing(
        startLatLng.lat, startLatLng.lng,
        endAirport.lat, endAirport.lng
    );
    console.log(bearing);

    // Rotate the icon
    const icon = document.querySelector('.player-icon');
    icon.style.transform = `rotate(${bearing}deg)`;
    icon.style.transition = 'transform 0.5s ease-in-out';
    icon.style.transformOrigin = 'center center';


    const duration = 1000; // 3 seconds
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate intermediate position
        const lat = startLatLng.lat + (endAirport.lat - startLatLng.lat) * progress;
        const lng = startLatLng.lng + (endAirport.lng - startLatLng.lng) * progress;

        // Update position and rotation
        playerMarker.setLatLng([lat, lng]);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

// Accurate bearing calculation
function getBearing(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const λ1 = lon1 * Math.PI/180;
    const λ2 = lon2 * Math.PI/180;

    // Calculate bearing
    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) -
              Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2 - λ1);

    let θ = Math.atan2(y, x);

    // Convert to degrees and normalize (0-360)
    return (θ * 180/Math.PI + 360) % 360;
}


export function animateAttack() {
    // play sound effect


    const icon = document.getElementById('player-icon');
    icon.style.animation = 'attack 0.5s ease-in-out';
    icon.style.transformOrigin = 'center center';
    icon.style.transition = 'transform 0.5s ease-in-out';

    return new Promise((resolve) => {
        setTimeout(() => {
            icon.style.animation = '';
            resolve();
        }, 500);
    });
}

export function animateSearch(){
    // play sound effect
    playSoundEffect(soundEffects.SEARCH);
    const icon = document.getElementById('player-icon');
    icon.style.animation = 'search 0.5s ease-in-out';
    icon.style.transformOrigin = 'center center';
    icon.style.transition = 'transform 0.5s ease-in-out';

    return new Promise((resolve) => {
        setTimeout(() => {
            icon.style.animation = '';
            resolve();
        }, 500);
    });
}


export function animateFoundItem(){
    // play sound effect
    playSoundEffect(soundEffects.FOUND);
    const icon = document.getElementById('player-icon');
    icon.style.animation = 'found 0.5s ease-in-out';
    icon.style.transformOrigin = 'center center';
    icon.style.transition = 'transform 0.5s ease-in-out';

    return new Promise((resolve) => {
        setTimeout(() => {
            icon.style.animation = '';
            resolve();
        }, 500);
    });
}

export function animateSpawn(){
    // play sound effect
    playSoundEffect(soundEffects.SPAWN);
    const icon = document.querySelector(".player")
    // apply the animation class teleport-spawn
    icon.classList.add("teleport-spawn");
    // wait for the animation to finish


    return new Promise((resolve) => {
        setTimeout(() => {
            //remove the animation class
            icon.classList.remove("teleport-spawn");
            resolve();
        }, 1000);
    });
}