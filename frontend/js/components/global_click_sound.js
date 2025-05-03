//uudelleenkäytettävä audio-instanssi
const clickAudio = new Audio('/Terminal-Zero/frontend/assets/audio/mixkit-modern-technology-select-3124.wav');

export function playClickSound() {
  clickAudio.play().catch(error => {
    console.error('Error playing click sound:', error);
  });
}

// klik-ääni kaikkiin nappeihin
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      playClickSound();
    });
  });
});

