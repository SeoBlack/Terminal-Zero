//RAIN EFFECT
function makeItRain() {
  const backRow = document.querySelector('.rain.back-row');
  backRow.innerHTML = '';
  let increment = 0;
  let backDrops = '';

  while (increment < 100) {
    const randoHundo = Math.floor(Math.random() * 98) + 1;
    const randoFiver = Math.floor(Math.random() * 4) + 2;
    const delay = randoHundo / 100;
    const duration = 0.5 + randoHundo / 100;
    increment += randoFiver;

    backDrops += `<div class="drop" style="right:${increment}%;bottom:${randoFiver * 2 - 1 + 100}%;animation-delay:${delay}s;animation-duration:${duration}s;">
      <div class="stem" style="animation-delay:${delay}s;animation-duration:${duration}s;"></div>
    </div>`;
  }

  backRow.innerHTML = backDrops;
}
makeItRain();
//RAIN EFFECT ENDS