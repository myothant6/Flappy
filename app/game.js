const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 240;
canvas.height = 426;

const p = document.querySelector("p");
const gravity = 0.2;
const space = 320;
let pipes = [];
let score = 0;

function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const d = {
  keys: {pressed: false},
  bird: {},
  ground: {},
  pipeN: {},
  pipeS: {}
};

function scoreSystem() {
  if (score > localStorage.getItem("best")) {
    localStorage.setItem("best", score);
  }
  
  score = 0;
}

function init() {
  scoreSystem();
  d.keys.pressed = false;
  d.bird = {
    img: createImage("assets/res/img/bird.png"),
    dx: 40,
    dy: 100,
    y: 0,
    width: 40,
    height: 30, // 3:4
    flyPower: 12,
    flyTime: 0
  };
  d.ground = {
    img1: createImage("assets/res/img/ground.png"),
    x1: 0,
    img2: createImage("assets/res/img/ground.png"),
    x2: 240
  };
  d.pipeN = {
    img: createImage("assets/res/img/pipeN.png"),
    width: 50,
    height: 210
  };
  d.pipeS = {
    img: createImage("assets/res/img/pipeS.png"),
    width: 50,
    height: 210
  };
  
  // pipes
  pipes = [];
  pipes[0] = {
    x: 300,
    y: Math.floor(Math.random() * 210) - 210
  };
}

init();

function draw() {
  // drawPipe
  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(d.pipeN.img, pipes[i].x, pipes[i].y);
    ctx.drawImage(d.pipeS.img, pipes[i].x, pipes[i].y + space);
    
    // add score
    if (pipes[i].x + 24 == d.bird.dx + d.bird.width/2) {score++}
    
    pipes[i].x -= 2;
    
    // create pipes
    if (pipes[i].x == 64) {
      pipes.push({
        x: 240,
        y: Math.floor(Math.random() * 210) - 210
      });
    }
    
    // collision detection
    if (d.bird.dx + d.bird.width >= pipes[i].x && d.bird.dx <= pipes[i].x + d.pipeN.width) {
      if (d.bird.dy <= pipes[i].y + d.pipeN.height || d.bird.dy + d.bird.height >= pipes[i].y + space) {init()}
    }
  }
  
  // draw ground
  ctx.drawImage(d.ground.img1, d.ground.x1, 316);
  ctx.drawImage(d.ground.img2, d.ground.x2, 316);
  
  // draw bird
  ctx.drawImage(d.bird.img, d.bird.dx, d.bird.dy, d.bird.width, d.bird.height);
  d.bird.dy += d.bird.y;
}

function loop() {
  ctx.clearRect(0, 0, 240, 426);
  draw();
  
  // gravity
  if (d.bird.dy + d.bird.height >= 316) {init()}
  else {d.bird.y += gravity}
  
  // keys pressed
  if (d.keys.pressed && d.bird.flyTime < 5 && d.bird.dy + d.bird.height > 0) {
    d.bird.y = 0;
    d.bird.dy -= d.bird.flyPower;
    d.bird.flyTime++;
  }
  
  // scroll
  if (d.ground.x1 < -240) {d.ground.x1 = 240 + d.ground.x2 - 2} else {d.ground.x1 -= 2}
  if (d.ground.x2 < -240) {d.ground.x2 = 240 + d.ground.x1 - 2} else {d.ground.x2 -= 2}
  
  // display
  p.innerHTML = "Score: " + score;
  
  requestAnimationFrame(loop);
}

loop();

// =>

addEventListener("touchstart", () => {
  d.keys.pressed = true;
});

addEventListener("touchend", () => {
  d.keys.pressed = false;
  d.bird.flyTime = 0;
});

addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 32:
      d.keys.pressed = true;;
    break;
  }
});

addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 32:
      d.keys.pressed = false;
      d.bird.flyTime = 0;
    break;
  }
});
