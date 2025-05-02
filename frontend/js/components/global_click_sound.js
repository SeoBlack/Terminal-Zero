import { playClickSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      playClickSound();
    });
  });
});
