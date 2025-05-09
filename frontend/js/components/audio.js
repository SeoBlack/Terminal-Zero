"use strict";


import {createConfirmationDialog} from "./confirmation_dialog.js";
import {Icons} from "./icons.js";

export function createSoundButton() {
  // Create sound button container
  let isPlaying = false;
  const soundContainer = document.createElement('div');
  soundContainer.className = 'sound-container';
  document.body.appendChild(soundContainer);

  // Create audio element and manage playlist
  const audio = document.createElement('audio');
  audio.volume = 0.5;
  audio.loop = false; // Disable looping for individual tracks
  let playlist = [];
  if(window.location.pathname.includes('startscreen')) {
    playlist.push('../../assets/audio/soundtrack1.mp3');
  }
  if(window.location.pathname.includes('game')) {
    playlist.push('../../assets/audio/soundtrack2.mp3');
    playlist.push('../../assets/audio/soundtrack3.mp3');
  }
  if(window.location.pathname.includes('lose_screen')) {
  playlist.push('../../assets/audio/losing.mp3');
  }
  if(window.location.pathname.includes('win_screen')) {
  playlist.push('../../assets/audio/winning.mp3');
  }

  let currentTrackIndex = 0;
  audio.src = playlist[currentTrackIndex];
  audio.innerHTML = 'Your browser doesn\'t support audio.';
  soundContainer.appendChild(audio);
  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Move to the next track
    //wait for 2 seconds before playing the next track
    setTimeout(() => {
        audio.src = playlist[currentTrackIndex];
        audio.play();
    }
    , 5000);

});


  // Create sound button
  const soundButton = document.createElement('button');
  soundButton.className = 'sound-button';
  soundButton.innerHTML = Icons.MUTE; // Muted icon by default
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
      soundButton.innerHTML = Icons.UNMUTE; // Unmuted icon
        // Store preference in localStorage
        localStorage.setItem('soundtrack', 'true');
    } else {
      audio.pause();
      soundButton.innerHTML = Icons.MUTE; // Muted icon
        // Store preference in localStorage
        localStorage.setItem('soundtrack', 'false');
    }
  });

  // Animate button on load
  soundButton.style.transform = 'scale(0)';
  setTimeout(() => {
    soundButton.style.transform = 'scale(1)';
  }, 1000)
    // Check if user has already set a preference
  const storedPreference = localStorage.getItem('soundtrack');
  if (storedPreference === 'true') {
    //wait for user to click on the screen
    const windowClickHandler =
      (e) => {
           soundButton.innerHTML = Icons.UNMUTE; // unmuted icon
          audio.play();
          isPlaying = true;
          window.removeEventListener('click', windowClickHandler);

    }
    window.addEventListener('click', windowClickHandler )
  } else if (storedPreference !== 'false') {
    // Only show dialog if preference is not explicitly set to false
    const dialog = createConfirmationDialog("Do you want to play the soundtrack?", () => {
      audio.play();
      isPlaying = true;
      localStorage.setItem('soundtrack', 'true');
      soundButton.innerHTML = Icons.UNMUTE; // unmuted icon
    });
    // No need to set display to block as createConfirmationDialog already does this
  }



  return soundButton;
}

