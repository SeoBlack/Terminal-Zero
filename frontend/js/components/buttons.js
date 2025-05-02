import { playClickSound } from './audio.js';

export function createTransparentButton(text, id, className, onClick) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.id = id;
    button.classList.add(className);

    button.addEventListener('click', (event) => {
        playClickSound();     // Klik-ääni
        onClick(event);       // Alkuperäinen toiminto
    });

    return button;
}
