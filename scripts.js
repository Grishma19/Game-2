let screen = 0;

let bubblePopSound;
let canonImage;

function preload() {
  canonImage = loadImage("canon.png");
  bubblePopSound = loadSound("bubblePop.mp3");
}

function setup() {
  createCanvas(400, 800);
  canonImage.resize(119, 153);
  bubblePopSound.play();
}

// defining bullet array
let bullets = [];
let stones = [];
let bubbles = [];
let bulletOnScreen = 10;

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
  //limit bullets on a screen
  bullets.push({
    x: hero.x,
    y: hero.y,
    w: 1,
    y: 30,
    hit: false,
  });
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
  x: 200,
  y: 647,
  w: 119,
  h: 153,
};

function draw() {
  if (screen == 0) {
    background(0);
    fill(255);
    textAlign(CENTER);
    text("Click to start", width / 2, height / 2);
  } else if (screen == 1) {
    // restrict movement of hero
    let xc = constrain(hero.x, leftConstraint, rightConstraint);

    background("white");

    // hero
    image(canonImage, xc - 59.5, hero.y);
    // fill("red");
    // noStroke();
    // rect(xc, hero.y, hero.w, hero.h);
    fill("black");
    noStroke();
    text(score, 300, 50);

    //bullet
    for (let [index, bullet] of bullets.entries()) {
      rectMode(CENTER);
      fill("black");
      stroke("black");
      rect(bullet.x, bullet.y, 1, 30);
      bullet.y -= 2;
      isBulletOffScreen(bullet, index);
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
          bubblePopSound.play();
          score = score + 10;
          speedMultiplyer = 100;
          console.log("you have " + bulletOnScreen + "bullets");
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
}

// for score
function isBubbleOffScreen(bubble, index) {
  if (bubble.y > 800) {
    bubbles.splice(index, 1);
    console.log(bubbles);
  }
}

// for removing bullet from array
function isBulletOffScreen(bullet, index) {
  if (bullet.y < 0) {
    bullets.splice(index, 1);
    bulletOnScreen = bulletOnScreen + 1;
    console.log("you have " + bulletOnScreen + "bullets");
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
  if (keyCode === 37) {
    hero.x = hero.x - 25;
  }
  if (keyCode === 39) {
    hero.x = hero.x + 25;
  }

  if (keyCode === 32 && bulletOnScreen > 0) {
    let bullet = {
      x: hero.x,
      y: 700,
    };

    bulletOnScreen = bulletOnScreen - 1;
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

function mousePressed() {
  if (screen == 0) {
    screen = 1;
  }
}
