"use strict";

document.addEventListener('DOMContentLoaded', function() {
  // Create sound button container
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
  soundButton.innerHTML = '🔇'; // Muted icon by default
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
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .sound-button:hover {
      background: rgba(0,0,0,0.7);
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(style);

  // Toggle function
  let isPlaying = false;

  soundButton.addEventListener('click', function() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      audio.play();
      soundButton.innerHTML = '🔊'; // Unmuted icon
    } else {
      audio.pause();
      soundButton.innerHTML = '🔇'; // Muted icon
    }
  });

  // Animate button on load
  soundButton.style.transform = 'scale(0)';
  setTimeout(() => {
    soundButton.style.transform = 'scale(1)';
  }, 1000);
});