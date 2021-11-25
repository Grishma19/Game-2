function setup() {
  createCanvas(400, 800);
}

// defining bullet array
let bullets = [];
let stones = [];
let bubbles = [];

// bubbles of diff
const colors = ["green", "red", "blue", "yellow", "purple"];

let score = 0;
let speedMultiplyer = 0;

// restrict movement of hero
let leftConstraint = 0;
let rightConstraint = 350;

// timers for tracking bubble creation
const spawnTime = 2000;
let currentTime = 0;
let lastCreationTime = 0;

const stoneTime = 10000;
let lastStoneCreationTime = 0;

function createBullet() {
  bullets.push({
    x: hero.x,
    y: hero.y,
    w: 1,
    y: 30,
    hit: false,
  });
}

function createBubble() {
  bubbles.push({
    x: random(400),
    y: 0,
    d: random(100),
    speed: random(5, speedMultiplyer / 100),
    hit: false,
    color: random(colors),
  });

  lastCreationTime = new Date().getTime();
}

function createStone() {
  stones.push({
    x: random(400),
    y: 0,
    d: random(50),
    speed: random(5, speedMultiplyer / 100),
    hit: false,
    color: random(colors),
  });

  lastStoneCreationTime = new Date().getTime();
}

let hero = {
  x: 0,
  y: 700,
  h: 100,
  w: 50,
};

function draw() {
  // restrict movement of hero
  let xc = constrain(hero.x, leftConstraint, rightConstraint);

  background("white");

  fill("red");
  noStroke();
  rect(xc, hero.y, hero.w, hero.h);
  text(score, 300, 50);

  //bullet
  for (let [index, bullet] of bullets.entries()) {
    fill("black");
    stroke("black");
    rect(bullet.x, bullet.y, 1, 30);
    bullet.y -= 2;
    isBulletOffScreen(bullet, index);
  }

  for (let [index, bubble] of bubbles.entries()) {
    fill("white");
    strokeWeight(2);
    stroke(bubble.color);
    circle(bubble.x, bubble.y, bubble.d);
    bubble.y = bubble.y + bubble.speed;
    isHit(hero, bubble);
    isOffScreen(bubble, index);

    // to shoot bubbles
    for (let [index, bullet] of bullets.entries()) {
      bubble.hit = collideRectCircle(
        bullet.x,
        bullet.y,
        1,
        30,
        bubble.x,
        bubble.y,
        bubble.d
      );

      if (bubble.hit) {
        bullets.splice(index, 1);
        bubbles.splice(index, 1);
        score = score + 10;
        speedMultiplyer = 100;
      }
    }
  }

  for (let [index, stone] of stones.entries()) {
    noStroke();
    fill(stone.color);
    circle(stone.x, stone.y, stone.d);
    stone.y = stone.y + stone.speed;
  }

  if (score > 100) {
    if (currentTime - lastStoneCreationTime > stoneTime) {
      createStone();
    }
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
}

// for score
function isOffScreen(bubble, index) {
  if (bubble.y > 800) {
    bubbles.splice(index, 1);
    console.log(bubbles);
    // score = score + 10;
    // speedMultiplyer = 100;
  }
}

// for removing bullet from array
function isBulletOffScreen(bullet, index) {
  if (bullet.y < 0) {
    bullets.splice(index, 1);
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
