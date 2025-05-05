const leavesContainer = document.getElementById('leaves');
const leafCount = 55;

for (let i = 0; i < leafCount; i++) {
  const leaf = document.createElement('i');

  // Random animation duration (5–15s) and delay (0–5s)
  const duration = 5 + Math.random() * 10;
  const delay = Math.random() * 5;

  leaf.style.animationDuration = `${duration}s`;
  leaf.style.animationDelay = `${delay}s`;

  leavesContainer.appendChild(leaf);
}