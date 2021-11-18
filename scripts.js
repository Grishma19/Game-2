function setup() {
  createCanvas(400, 800);
}

let bubbles = [];

let score = 0;
let speedMultiplyer = 0;

// restrict movement of hero
let leftConstraint = 0;
let rightConstraint = 350;

// timers for tracking bubble creation
const spawnTime = 2000;
let currentTime = 0;
let lastCreationTime = 0;

function createBubble() {
  bubbles.push({
    x: random(400),
    y: 0,
    w: random(100),
    h: 0,
    speed: random(5, speedMultiplyer / 100),
  });
  lastCreationTime = new Date().getTime();
}

let hero = {
  x: 0,
  y: 700,
  h: 100,
  w: 50,
};

// defining bullet array
let bullets = [];

function draw() {
  // restrict movement of hero
  let xc = constrain(hero.x, leftConstraint, rightConstraint);

  background("white");
  fill("red");
  rect(xc, hero.y, hero.w, hero.h);
  // rect(bullet.x, bullet.y, bullet.w, bullet.h);
  text(score, 300, 50);

  for (let [index, bubble] of bubbles.entries()) {
    ellipse(bubble.x, bubble.y, bubble.w, bubble.w);
    bubble.y = bubble.y + bubble.speed;
    isHit(hero, bubble);
    isOffScreen(bubble, index);
  }

  hero.x = mouseX - 25;

  constrain(mouseX, 0, 400);

  if (keyIsPressed) {
    console.log("bullets");
  }

  currentTime = new Date().getTime();

  if (currentTime - lastCreationTime > spawnTime) {
    createBubble();
  }

  for (let bullet of bullets) {
    rect(bullet.x, bullet.y, 1, 30);
    bullet.y -= 2;
  }
}

function isOffScreen(bubble, index) {
  if (bubble.y > 800) {
    bubbles.splice(index, 1);
    console.log(bubbles);
    score = score + 10;
    speedMultiplyer = 100;
  }
}

function isHit(hero, bubble) {
  if (bubble.x > hero.x && bubble.x + bubble.w < hero.x + hero.w) {
    if (bubble.y + bubble.h > hero.y && bubble.y + bubble.h < hero.y + hero.h) {
      console.log("HIT");
      window.location.reload();
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    let bullet = {
      x: mouseX,
      y: 700,
    };
    bullets.push(bullet);
  }
}
