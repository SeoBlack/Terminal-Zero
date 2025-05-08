
// klik-ääni kaikkiin nappeihin
import {playSoundEffect, soundEffects} from "./sound_effects.js";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      playSoundEffect(soundEffects.CLICK);
    });
  });
});

