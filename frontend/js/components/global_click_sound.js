export function playClickSound() {
  const clickAudio = new Audio('/Terminal-Zero/frontend/assets/audio/mixkit-modern-technology-select-3124.wav');
  clickAudio.play();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      playClickSound();
    });
  });
});
