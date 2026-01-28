let currentPage = 1;

function nextPage() {
  document.getElementById(`page${currentPage}`).classList.remove("active");
  currentPage++;
  const next = document.getElementById(`page${currentPage}`);
  next.classList.add("active");

  // 🔥 Trigger letter when reaching page 5
  if (currentPage === 5) {
    letterEl.innerHTML = ""; // reset if revisited
    lineIndex = 0;
    setTimeout(writeLetter, 600);
  }
}
// 🎊 Confetti animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 4 + 2,
  d: Math.random() * 40,
  color: `hsl(${Math.random() * 360}, 70%, 70%)`
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(p => {
    p.y += Math.cos(p.d) + 1;
    p.x += Math.sin(p.d);

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawConfetti, 30);
// 🎀 Photo Album Logic
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg"
];

let currentPhoto = 0;
const albumPhoto = document.getElementById("albumPhoto");
const gift = document.getElementById("gift");

function showGift() {
  gift.classList.add("show");
  setTimeout(() => gift.classList.remove("show"), 800);
}

function nextPhoto() {
  currentPhoto = (currentPhoto + 1) % photos.length;
  albumPhoto.src = photos[currentPhoto];
  showGift();
}

function prevPhoto() {
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  albumPhoto.src = photos[currentPhoto];
  showGift();
}
// 🎮 Matching Game Logic
const icons = ["💖","🎀","🌸","✨","🍰","🎁"];
let cards = [...icons, ...icons];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const board = document.getElementById("gameBoard");

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  shuffle(cards);
  cards.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${icon}</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, icon));
    board.appendChild(card);
  });
}

function flipCard(card, icon) {
  if (lockBoard || card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = { card, icon };
    return;
  }

  secondCard = { card, icon };
  lockBoard = true;

  if (firstCard.icon === secondCard.icon) {
    matchedPairs++;
    resetTurn();

    if (matchedPairs === icons.length) {
      document.getElementById("winText").classList.remove("hidden");
      document.getElementById("gameNext").classList.remove("hidden");
    }
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove("flip");
      secondCard.card.classList.remove("flip");
      resetTurn();
    }, 900);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
// 🎂 Cake Interaction
let cakeClicked = false;

function cutCake() {
  if (cakeClicked) return;
  cakeClicked = true;

  document.getElementById("birthdaySong").play();
  document.getElementById("presents").classList.remove("hidden");
  document.getElementById("cakeText").classList.remove("hidden");
  document.getElementById("cakeNext").classList.remove("hidden");

  // mini confetti burst
  for (let i = 0; i < 30; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: 0,
      r: Math.random() * 4 + 2,
      d: Math.random() * 40,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`
    });
  }
}
// ✍️ Medieval Letter Writing Animation
const letterLines = [
  "dear twin,",
  "",
  "On this day, the world quietly became a little brighter.",
  "Not because of candles or gifts —",
  "but because you exist within it.",
  "",
  "Your kindness has weight.",
  "Your presence leaves warmth behind.",
  "And even on days you doubt yourself,",
  "you are still more than enough.",
  "",
  "May the years ahead be gentle with you.",
  "May your heart feel safe,",
  "and your smile never feel forced.",
  "",
  "Happy Birthday.anshiiiii",
  "This page will wait for you — always."
];

let lineIndex = 0;
const letterEl = document.getElementById("letterText");

function writeLetter() {
  if (lineIndex < letterLines.length) {
    letterEl.innerHTML += letterLines[lineIndex] + "\n";
    lineIndex++;
    setTimeout(writeLetter, 650);
  }
}


