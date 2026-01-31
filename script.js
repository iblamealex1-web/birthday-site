// 🔁 PAGE NAVIGATION
let current = 1;
const total = 5;

function goNext() {
  if (current < total) {
    document.getElementById("page" + current).classList.remove("active");
    current++;

    document.getElementById("page" + current).classList.add("active");

    // start game when page 3 opens
    if (current === 3 && typeof startGame === "function") {
      startGame();
    }

    // start letter when page 5 opens
    if (current === 5 && typeof startLetter === "function") {
      setTimeout(startLetter, 300);
    }
  }
}

/* =========================
   📸 PHOTO ALBUM (PAGE 2)
========================= */
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg"
];

let photoIndex = 0;

function nextPhoto() {
  const img = document.getElementById("albumImg");
  img.classList.add("fade");

  setTimeout(() => {
    photoIndex = (photoIndex + 1) % photos.length;
    img.src = photos[photoIndex];
    img.classList.remove("fade");
  }, 400);
}

function prevPhoto() {
  const img = document.getElementById("albumImg");
  img.classList.add("fade");

  setTimeout(() => {
    photoIndex = (photoIndex - 1 + photos.length) % photos.length;
    img.src = photos[photoIndex];
    img.classList.remove("fade");
  }, 400);
}

/* =========================
   🎮 MATCHING GAME (PAGE 3)
========================= */
const symbols = ["🎀","🎂","💖","🌸","🎁","✨"];
let cards = [];
let first = null;
let second = null;
let lock = false;
let matches = 0;

function startGame() {
  const game = document.getElementById("game");
  if (!game) return;

  game.innerHTML = "";
  cards = [...symbols, ...symbols];
  matches = 0;
  first = second = null;
  lock = false;

  document.getElementById("winMsg").style.display = "none";
  document.getElementById("gameNext").style.display = "none";

  cards.sort(() => Math.random() - 0.5);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;
    card.innerHTML = "❓";

    card.onclick = () => flip(card);
    game.appendChild(card);
  });
}

function flip(card) {
  if (lock || card === first || card.classList.contains("matched")) return;

  card.innerHTML = card.dataset.symbol;
  card.classList.add("flipped");

  if (!first) {
    first = card;
    return;
  }

  second = card;
  lock = true;

  if (first.dataset.symbol === second.dataset.symbol) {
    first.classList.add("matched");
    second.classList.add("matched");
    resetTurn();
    matches++;

    if (matches === symbols.length) {
      document.getElementById("winMsg").style.display = "block";
      document.getElementById("gameNext").style.display = "inline-block";
    }
  } else {
    setTimeout(() => {
      first.innerHTML = "❓";
      second.innerHTML = "❓";
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      resetTurn();
    }, 700);
  }
}

function resetTurn() {
  first = second = null;
  lock = false;
}

/* =========================
   🎂 CAKE INTERACTION (PAGE 4)
========================= */
let candleBlown = false;

function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;

  document.getElementById("flame").classList.add("off");
  document.querySelector(".cake").classList.add("cut");

  document.getElementById("cakeMsg").style.display = "block";
  document.getElementById("cakeNext").style.display = "inline-block";
}

/* =========================
   ✉️ FINAL LETTER (PAGE 5)
========================= */
const herName = "anshieee";

const letterLines = [
  `Dear ${herName},`,
  "",
  "Happy Birthday twinn 🤍",
  "",
  "This little journey was made just for you.",
  "Not to impress — but to remind you",
  "how special you truly are.",
  "",
  "May your days be gentle.",
  "May your heart stay warm.",
  "And may you always know",
  "you are deeply appreciated.",
  "",
  "With care,",
  "Someone who smiles because of you"
];

let letterIndex = 0;
let letterTimer = null;

function startLetter() {
  const el = document.getElementById("letterText");
  if (!el) return;

  el.innerHTML = "";
  letterIndex = 0;

  if (letterTimer) clearInterval(letterTimer);

  letterTimer = setInterval(() => {
    if (letterIndex < letterLines.length) {
      el.innerHTML += letterLines[letterIndex] + "\n";
      letterIndex++;
    } else {
      clearInterval(letterTimer);
    }
  }, 600);
}
  
