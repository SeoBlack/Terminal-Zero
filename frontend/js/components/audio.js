"use strict";


import {createConfirmationDialog} from "./confirmation_dialog.js";

export function createSoundButton() {
  // Create sound button container
  let isPlaying = false;
  const soundContainer = document.createElement('div');
  soundContainer.className = 'sound-container';
  document.body.appendChild(soundContainer);

  // Create audio element
  const audio = document.createElement('audio');
  audio.loop = true;
  audio.innerHTML = '<source src="../../assets/audio/soundtrack.mp3" type="audio/mpeg">Your browser doesn\'t support audio.';
  soundContainer.appendChild(audio);

  // Create sound button
  const soundButton = document.createElement('button');
  soundButton.className = 'sound-button';
  soundButton.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12c0 1.126-.5 2.5-1.5 3.5m2.864-9.864A8.972 8.972 0 0 1 21 12c0 2.023-.5 4.5-2.5 6M7.8 7.5l2.56-2.133a1 1 0 0 1 1.64.768V12m0 4.5v1.365a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1-4 14 14"/>
</svg>
`; // Muted icon by default
  soundContainer.appendChild(soundButton);

  // Add basic styles
  const style = document.createElement('style');
  style.textContent = `
    .sound-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 100;
      
    }
    .sound-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      border: none;
      color: #efb302;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,100,0.4);
        backdrop-filter: blur(10px);
    }
    .sound-button:hover {
      background: rgba(0,0,0,0.7);
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(style);

  // Toggle function


  soundButton.addEventListener('click', function() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      audio.play();
      soundButton.innerHTML = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">\n' +
        '  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.5 8.43A4.985 4.985 0 0 1 19 12a4.984 4.984 0 0 1-1.43 3.5M14 6.135v11.73a1 1 0 0 1-1.64.768L8 15H6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"/>\n' +
        '</svg>\n'; // Unmuted icon
    } else {
      audio.pause();
      soundButton.innerHTML = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">\n' +
          '  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12c0 1.126-.5 2.5-1.5 3.5m2.864-9.864A8.972 8.972 0 0 1 21 12c0 2.023-.5 4.5-2.5 6M7.8 7.5l2.56-2.133a1 1 0 0 1 1.64.768V12m0 4.5v1.365a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1-4 14 14"/>\n' +
          '</svg>\n'; // Muted icon
    }
  });

  // Animate button on load
  soundButton.style.transform = 'scale(0)';
  setTimeout(() => {
    soundButton.style.transform = 'scale(1)';
  }, 1000)
  // show a dialog to ask the user if they want to play the soundtrack
    const dialog = createConfirmationDialog("Do you want to play the soundtrack?", () => {
        audio.play();
        isPlaying = true
      localStorage.setItem('soundtrack', 'true');

          soundButton.innerHTML = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">\n' +
            '  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.5 8.43A4.985 4.985 0 0 1 19 12a4.984 4.984 0 0 1-1.43 3.5M14 6.135v11.73a1 1 0 0 1-1.64.768L8 15H6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"/>\n' +
            '</svg>\n'; //unmuted icon

    });
    dialog.style.display = 'block';

  return soundButton;
}