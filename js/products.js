const cards = Array.from(document.querySelectorAll(".product-card"));
const prevBtn = document.getElementById("prevProduct");
const nextBtn = document.getElementById("nextProduct");

let startIndex = 0;

function visibleCount() {
  return window.innerWidth <= 640 ? 1 : window.innerWidth <= 980 ? 2 : cards.length;
}

function updateCards() {
  const show = visibleCount();

  cards.forEach((card, idx) => {
    const active = idx >= startIndex && idx < startIndex + show;
    card.classList.toggle("is-active", active);
  });

  if (show === cards.length) {
    startIndex = 0;
  } else if (startIndex > cards.length - show) {
    startIndex = cards.length - show;
  }
}

function shift(direction) {
  const show = visibleCount();

  if (show === cards.length) {
    return;
  }

  startIndex += direction;

  if (startIndex < 0) {
    startIndex = cards.length - show;
  }

  if (startIndex > cards.length - show) {
    startIndex = 0;
  }

  updateCards();
}

if (prevBtn && nextBtn && cards.length) {
  prevBtn.addEventListener("click", () => shift(-1));
  nextBtn.addEventListener("click", () => shift(1));
  window.addEventListener("resize", updateCards);
  updateCards();
}
