const button = document.querySelector("#button");
const hightScore = document.querySelector("#best");

function loop() {
  if (localStorage.getItem("best") == null) {
    localStorage.setItem("best", 0);
  }

  hightScore.innerHTML = "Best: " + localStorage.getItem("best");

  requestAnimationFrame(loop);
}

loop();

button.onclick = () => location.href = "play.html";
