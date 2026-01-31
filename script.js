let current = 1;
const total = 5;

function goNext() {
  if (current < total) {
    document.getElementById("page" + current).classList.remove("active");
    current++;
    document.getElementById("page" + current).classList.add("active");
  }
}
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg"
];

let photoIndex = 0;

function nextPhoto() {
  photoIndex = (photoIndex + 1) % photos.length;
  document.getElementById("albumImg").src = photos[photoIndex];
}

function prevPhoto() {
  photoIndex = (photoIndex - 1 + photos.length) % photos.length;
  document.getElementById("albumImg").src = photos[photoIndex];
}
  
