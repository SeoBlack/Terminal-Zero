document.addEventListener('DOMContentLoaded', function() {
  // Create container for fireflies
  const container = document.createElement('div');
  container.className = 'fireflies-container';
  document.body.appendChild(container);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .fireflies-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      overflow: hidden;
      pointer-events: none;
      background-image: url("../../assets/images/background-airport.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }
    .firefly {
      position: absolute;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, rgba(255,255,200,0.8) 0%, rgba(255,255,100,0.4) 50%, transparent 100%);
      filter: drop-shadow(0 0 5px rgba(255,255,150,0.7));
    }
    @keyframes move {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
      }
    }
  `;
  document.head.appendChild(style);

  const fireflies = [];
  const maxFireflies = 14;

  function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';

    // Random position
    firefly.style.top = `${Math.random() * 100}%`;
    firefly.style.left = `${Math.random() * 100}%`;

    // Random animation
    const duration = `${Math.random() * 5 + 5}s`;
    firefly.style.animation = `move ${duration} infinite alternate`;

    return firefly;
  }

  function addFirefly() {
    const firefly = createFirefly();
    container.appendChild(firefly);
    fireflies.push(firefly);

    // Remove oldest firefly if we've reached max
    if (fireflies.length > maxFireflies) {
      const oldest = fireflies.shift();
      oldest.remove();
    }
  }

  // Start adding fireflies periodically
  const interval = setInterval(addFirefly, 1000);

  // Initial batch of fireflies
  for (let i = 0; i < 5; i++) {
    addFirefly();
  }

  // Cleanup function (though in a real app you'd call this when needed)
  window.cleanupFireflies = function() {
    clearInterval(interval);
    container.remove();
    style.remove();
  };
});