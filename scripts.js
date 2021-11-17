function setup() {
  createCanvas(400, 800);
}

let bubbles = [];

let score = 0;
let speedMultiplyer = 0;

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

// defining bullet
let bullet = {
  x: hero.x,
  y: hero.y,
  h: 50,
  w: 20,
};

function draw() {
  background("white");
  fill("red");
  rect(hero.x, hero.y, hero.w, hero.h);
  rect(bullet.x, bullet.y, bullet.w, bullet.h);
  text(score, 300, 50);

  for (let [index, bubble] of bubbles.entries()) {
    ellipse(bubble.x, bubble.y, bubble.w, bubble.w);
    bubble.y = bubble.y + bubble.speed;
    isHit(hero, bubble);
    isOffScreen(bubble, index);
  }

  // restrict movement of hero
  if (hero.x < 400 && hero.x > 0) {
    hero.x = mouseX - 25;
  }

  hero.x = mouseX - 25;

  constrain(mouseX, 0, 400);

  if (keyIsPressed) {
    console.log("bullets");
  }

  // for bullet hitting bubble 1
  if (keyIsPressed) {
    if (bullet.y < 0) {
      bullet.y = bullet.y - 1;
      bullet.y = height;
    }
  }

  // for bullet hitting bubble 2
  // if (bullet.y < 0) {
  //   bullet.y = bullet.y - 1;
  //   bullet.y = height;
  // }

  currentTime = new Date().getTime();

  if (currentTime - lastCreationTime > spawnTime) {
    createBubble();
  }
}

//for bullet hitting bubble 3
// function keyPressed() {
//   if (keyCode === SPACE) {
//     if (bullet.y < 0) {
//       bullet.y = bullet.y - 1;
//       bullet.y = height;
//     }
//   }
// }

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
