//scan animation
import {playSoundEffect, soundEffects} from "./sound_effects.js";
import {showInformationDialog} from "./information_dialog.js";

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



    // Calculate bearing (direction)
    const bearing = getBearing(
        startLatLng.lat, startLatLng.lng,
        endAirport.lat, endAirport.lng
    );

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
export function animateWin(){
    // play sound effect
    playSoundEffect(soundEffects.WIN);
    showInformationDialog("Victory", "You have found the safe airport! You win!");

    const firstFireworks = setInterval(() =>{
        const dice = Math.floor((Math.random() * 9) + 1);
        if (dice > 5 ) {
            launchFirework();
        }
    }, 500);
        const secondFireworks = setInterval(() =>{
        const dice = Math.floor((Math.random() * 9) + 1);
        if (dice > 5 ) {
            launchFirework();
        }
    }, 500);

    const body = document.querySelector('body');

    setTimeout(() => {

         body.classList.add('dim-overlay');
        clearInterval(firstFireworks);
        clearInterval(secondFireworks);
    }, 3000);
    setTimeout(() => {
        body.classList.remove('dim-overlay');
    }, 5000);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);

    }
    );

}

export function animateLose(reason){
        // play sound effect
    playSoundEffect(soundEffects.PIANO_SMASH);
    showInformationDialog("You Lost", reason );
     const body = document.body;
    const overlay = document.createElement('div');
    overlay.classList.add('lose-over-overlay');
    body.appendChild(overlay);


    // Add shake effect
    body.classList.add('shake');

    // Show red overlay and message
    overlay.classList.add('fade-in');

    // Remove shake class after animation completes
    setTimeout(() => {
        body.classList.remove('shake');
        body.classList.add('dim-overlay');
    }, 2000);

    // Optional: Reset after 3 seconds
    setTimeout(() => {
        overlay.classList.remove('fade-in');
    }, 4000);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 7000);

    }
    );
}


function launchFirework(){
        const colors = ['#ff0000', '#ff7300', '#fffb00', '#48ff00', '#00ffd5', '#002bff', '#7a00ff', '#ff00c8'];
            const particles = 50;
            // const launchX = (Math.random() * window.innerWidth) / 2 ;
            // const launchY = (Math.random() * window.innerHeight - 500) /2 ;
            //get random place in the center of the screen

            const launchX = window.innerWidth / 2 - Math.random() * 600;
            const launchY = (window.innerHeight / 2) * Math.random();
            const fireworkSound = playSoundEffect(soundEffects.FIREWORK);
            for (let i = 0; i < particles; i++) {
                const firework = document.createElement('div');
                firework.className = 'firework';

                // Random position near center

                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 100;

                // Set random color
                const color = colors[Math.floor(Math.random() * colors.length)];
                firework.style.backgroundColor = color;
                firework.style.boxShadow = `0 0 10px 2px ${color}`;

                // Set animation end position
                firework.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                firework.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

                // Random delay for more natural effect
                firework.style.animationDelay = `${Math.random() * 0.2}s`;

                // Position the firework
                firework.style.left = `${launchX}px`;
                firework.style.top = `${launchY}px`;

                document.body.appendChild(firework);

                // Remove element after animation completes
                firework.addEventListener('animationend', () => {
                    firework.remove();
                });
            }
}

export function animateSpawn(){
    // play sound effect
    playSoundEffect(soundEffects.SPAWN);
    const icon = document.querySelector(".player")
    // apply the animation class teleport-spawn
    if (!icon) return;
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
export function animateZombieAttackEffect() {
    // Luo punainen välähdysruutu
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
    overlay.style.zIndex = 9999;
    overlay.style.pointerEvents = 'none';
    overlay.style.animation = 'zombieAttackFlash 0.3s ease-out';

    document.body.appendChild(overlay);

    // Poista nopeasti
    setTimeout(() => {
        overlay.remove();
    }, 300);

    // Ruudun tärinä
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 300);
}

export function animateShootEffect() {
    const container = document.createElement('div');
    container.classList.add('shoot-effect');
    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 400);
}
