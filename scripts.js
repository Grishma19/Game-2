function setup() {
  createCanvas(400, 800);
}

// let canon;
// function preload() {
//   canon = loadImage("canon.png");
// }

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

// timers for tracking stone creation
const stoneTime = 8000;
let lastStoneCreationTime = 0;

// creating bullet
function createBullet() {
  for (let i = 0; i < 6; i++) {
    //limit bullets on a screen
    bullets.push({
      x: hero.x,
      y: hero.y,
      w: 1,
      y: 30,
      hit: false,
    });
  }
}

// creating bubble
function createBubble() {
  bubbles.push({
    x: random(400),
    y: 0,
    d: random(20, 80),
    speed: random(5, speedMultiplyer / 100),
    hit: false,
    color: random(colors),
  });

  lastCreationTime = new Date().getTime();
}

// creating stone
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

// creating hero
let hero = {
  x: 0,
  y: 700,
  w: 50,
  h: 100,
};

function draw() {
  // restrict movement of hero
  let xc = constrain(hero.x, leftConstraint, rightConstraint);

  background("white");

  // hero
  // image(canon, hero.x, hero.y, 119, 153);
  fill("red");
  noStroke();
  rect(xc, hero.y, hero.w, hero.h);
  text(score, 300, 50);

  //bullet
  for (let [index, bullet] of bullets.entries()) {
    for (let i = 0; i < bullets.length; i++) {
      fill("black");
      stroke("black");
      rect(bullet.x, bullet.y, 1, 30);
      bullet.y -= 2;
      isBulletOffScreen(bullet, index);
    }
  }

  //bubble
  for (let [index, bubble] of bubbles.entries()) {
    fill("white");
    strokeWeight(2);
    stroke(bubble.color);
    circle(bubble.x, bubble.y, bubble.d);
    bubble.y = bubble.y + bubble.speed;
    isBubbleHit(hero, bubble);
    isBubbleOffScreen(bubble, index);

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

      // scoring once bubble is hit
      if (bubble.hit) {
        bullets.splice(index, 1);
        bubbles.splice(index, 1);
        score = score + 10;
        speedMultiplyer = 100;
      }
    }
  }

  //stone
  for (let [index, stone] of stones.entries()) {
    noStroke();
    fill(stone.color);
    circle(stone.x, stone.y, stone.d);
    stone.y = stone.y + stone.speed;
    isStoneHit(hero, stone);
    isStoneOffScreen(stone, index);

    // to shoot stones
    for (let [index, bullet] of bullets.entries()) {
      stone.hit = collideRectCircle(
        bullet.x,
        bullet.y,
        1,
        30,
        stone.x,
        stone.y,
        stone.d
      );

      // reload once stone is shot
      if (stone.hit) {
        window.location.reload();
      }
    }
  }

  //creating new stones
  if (score > 100) {
    if (currentTime - lastStoneCreationTime > stoneTime) {
      createStone();
    }
  }

  currentTime = new Date().getTime();

  if (currentTime - lastCreationTime > spawnTime) {
    createBubble();
  }
}

// move hero
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    hero.x = hero.x - 20;
  } else if (keyCode === RIGHT_ARROW) {
    hero.x = hero.x + 20;
  }
}

// for score
function isBubbleOffScreen(bubble, index) {
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
function isBubbleHit(hero, bubble) {
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

// for removing stone from array
function isStoneOffScreen(stone, index) {
  if (stone.y < 0) {
    stones.splice(index, 1);
  }
}

// for reload once stone touches the hero
function isStoneHit(hero, stone) {
  if (
    stone.x + stone.d > hero.x &&
    stone.y + stone.d > hero.y &&
    stone.x - stone.d < hero.x + hero.w &&
    stone.y - stone.d < hero.y + hero.h
  ) {
    console.log("HIT");
    window.location.reload();
  }
}
