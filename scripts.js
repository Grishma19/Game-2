function setup() {
  createCanvas(400, 800);
}

let bubbles = [];

let colorBubble = [("green", "red", "blue", "yellow", "purple")];

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
    d: random(100),
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
  noStroke();
  rect(xc, hero.y, hero.w, hero.h);
  text(score, 300, 50);

  for (let [index, bubble] of bubbles.entries()) {
    fill("white");
    strokeWeight(2);
    stroke(random(colorBubble));
    circle(bubble.x, bubble.y, bubble.d);
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

  //bullet
  for (let bullet of bullets) {
    fill("black");
    stroke("black");
    rect(bullet.x, bullet.y, 1, 30);
    bullet.y -= 2;
  }
}

// for score
function isOffScreen(bubble, index) {
  if (bubble.y > 800) {
    bubbles.splice(index, 1);
    console.log(bubbles);
    score = score + 10;
    speedMultiplyer = 100;
  }
}

// for reload
function isHit(hero, bubble) {
  if (
    bubble.x + bubble.d > hero.x &&
    bubble.y + bubble.d > hero.y &&
    bubble.x - bubble.d < hero.x + hero.w &&
    bubble.y - bubble.d < hero.y + hero.h
  ) {
    console.log("HIT");
    window.location.reload();
  }
}

//for bullets
function keyPressed() {
  if (keyCode === 32) {
    let bullet = {
      x: mouseX,
      y: 700,
    };

    bullets.push(bullet);
  }
}
