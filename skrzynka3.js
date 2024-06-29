let colors = {
  blue: '#3B429F',
  purple: '#AA7DCE',
  lightPink: '#F5D7E3',
  pink: '#F4A5AE',
  darkPink: '#A8577E'
};

let playwriteFont, tiny5Font;
let questionMarks = [];
let lastSpawnTime = 0; // Zmienna do przechowywania czasu ostatniego pytajnika
let spawnInterval = 200; // Interwał czasowy (w milisekundach) pomiędzy pojawianiem się pytajników
let buttonHovered = false; // Flaga do śledzenia stanu hover
let buttonClicked = false; // Flaga do śledzenia stanu kliknięcia

function preload() {
  // Wczytanie czcionek
  playwriteFont = loadFont('PlaywriteNL.ttf');
  tiny5Font = loadFont('Tiny5.ttf');
  bubble = loadSound('bubble.mp3', () => {
    bubble.setVolume(0.1); // Ściszenie dźwięku o połowę
  });
}
  
function setup() {
  createCanvas(1920, 1080);
  background(colors.pink);

  // Rysowanie zamkniętej koperty
  drawEnvelope(width / 2, height / 2);

  // Napis na dole bliżej koperty
  textAlign(CENTER);
  textFont(playwriteFont);
  textSize(32);
  fill(colors.blue);
  text('Share Your Secret', width / 2, height / 2 + 150);

  // Rysowanie przycisku START
  drawStartButton();
}

function draw() {
  background(colors.pink);

  // Rysowanie zamkniętej koperty
  drawEnvelope(width / 2, height / 2);

  // Rysowanie przycisku START
  drawStartButton();

  // Rysowanie pytajników
  for (let i = questionMarks.length - 1; i >= 0; i--) {
    let q = questionMarks[i];
    fill(colors.blue);
    textSize(48);
    text('?', q.x, q.y);
    q.x += q.vx;
    q.y += q.vy;

    // Usuwanie pytajników poza ekranem
    if (q.x < 0 || q.x > width || q.y < 0 || q.y > height) {
      questionMarks.splice(i, 1);
    }
  }

  // Napis na dole bliżej koperty
  textAlign(CENTER);
  textFont(playwriteFont);
  textSize(32);
  fill(colors.blue);
  text('Share Your Secret', width / 2, height / 2 + 150);
}

function drawEnvelope(x, y) {
  fill(colors.lightPink);
  stroke(colors.darkPink);
  strokeWeight(2);

  // Koperta
  beginShape();
  vertex(x - 100, y - 50);
  vertex(x + 100, y - 50);
  vertex(x + 100, y + 50);
  vertex(x - 100, y + 50);
  endShape(CLOSE);

  // Klapka koperty
  beginShape();
  vertex(x - 100, y - 50);
  vertex(x, y);
  vertex(x + 100, y - 50);
  endShape(CLOSE);
}

function drawStartButton() {
  let buttonX = width / 2;
  let buttonY = height / 2 - 150;
  let buttonWidth = 150;
  let buttonHeight = 50;

  // Sprawdzenie, czy kursor jest nad przyciskiem
  if (mouseX > buttonX - buttonWidth / 2 && mouseX < buttonX + buttonWidth / 2 &&
      mouseY > buttonY - buttonHeight / 2 && mouseY < buttonY + buttonHeight / 2) {
    buttonHovered = true;
  } else {
    buttonHovered = false;
  }

  // Zmiana koloru przycisku po kliknięciu
  if (buttonClicked) {
    fill(colors.purple);
  } else if (buttonHovered) {
    fill(colors.darkPink);
  } else {
    fill(colors.blue);
  }

  rectMode(CENTER);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);

  fill(colors.lightPink);
  textAlign(CENTER, CENTER);
  textFont(tiny5Font);
  textSize(24);
  text('START', buttonX, buttonY);
}

function mouseMoved() {
  // Sprawdzenie, czy minął odpowiedni czas od ostatniego pytajnika
  if (millis() - lastSpawnTime > spawnInterval) {
    let angle = atan2(mouseY - height / 2, mouseX - width / 2);
    let vx = cos(angle) * 5;
    let vy = sin(angle) * 5;
    questionMarks.push({x: width / 2, y: height / 2, vx: vx, vy: vy});
    lastSpawnTime = millis(); // Aktualizacja czasu ostatniego pytajnika
    {
      bubble.play();
    }
  }
}

function mousePressed() {
  // Sprawdzenie, czy kliknięto na kopertę (współrzędne koperty)
  let envelopeX = width / 2;
  let envelopeY = height / 2;
  let envelopeWidth = 200;
  let envelopeHeight = 100;

  if (mouseX > envelopeX - envelopeWidth / 2 && mouseX < envelopeX + envelopeWidth / 2 &&
      mouseY > envelopeY - envelopeHeight / 2 && mouseY < envelopeY + envelopeHeight / 2) {
    startEnvelopeInteraction();
  }

  // Sprawdzenie, czy kliknięto na przycisk START
  let buttonX = width / 2;
  let buttonY = height / 2 - 150;
  let buttonWidth = 150;
  let buttonHeight = 50; 

  if (mouseX > buttonX - buttonWidth / 2 && mouseX < buttonX + buttonWidth / 2 &&
      mouseY > buttonY - buttonHeight / 2 && mouseY < buttonY + buttonHeight / 2) {
    buttonClicked = true;
    startEnvelopeInteraction();
  }
}

function startEnvelopeInteraction() {
  background(colors.pink);
  questionMarks = []; // Czyszczenie pytajników
  drawEnvelope(width / 2, height / 2);
  drawStartButton();
  textAlign(CENTER);
  textFont(playwriteFont);
  textSize(32);
  fill(colors.blue);
  text('Share Your Secret', width / 2, height / 2 + 150);
}
