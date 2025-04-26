// a container that will contain the sound button and the help button
import {createSoundButton} from "./audio.js";
import {createHelpButton} from "./help.js";

document.addEventListener('DOMContentLoaded', function() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
    
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    display: flex;
    height: 100px;
    flex-direction: column;
    gap: 10px;
    `;

    const soundButton = createSoundButton();
    const helpButton = createHelpButton();


    // Append buttons to the container
    buttonsContainer.appendChild(soundButton);
    buttonsContainer.appendChild(helpButton);
    document.body.appendChild(buttonsContainer);
});