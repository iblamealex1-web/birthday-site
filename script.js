let current = 1;
const total = 5;

function goNext() {
  if (current < total) {
    document.getElementById("page" + current).classList.remove("active");
    current++;
    document.getElementById("page" + current).classList.add("active");
  }
}

  
