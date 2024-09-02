const button = document.querySelector("#button");
const best = document.querySelector("#best");

function loop() {
    if (localStorage.getItem("best") == null) {
        localStorage.setItem("best", 0);
    }
    
    best.innerHTML = "Best: " + localStorage.getItem("best");
    
    requestAnimationFrame(loop);
}

loop();

button.onclick = () => location.href = "play.html";
