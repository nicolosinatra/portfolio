// Numero di settori simmetrici
let symmetry = 6;
let angle = 360 / symmetry;

// variabili per smoothing
let smoothX, smoothY;

function setup() {
  if (windowWidth < 600) {
    createCanvas(windowWidth, windowHeight - 48 - 30);
  } else if (windowWidth < 1024) {
    createCanvas(windowWidth, windowHeight - 53.5 - 36);
  } else {
    createCanvas(windowWidth, windowHeight - 56 - 43); // togli dimensione header e footer
  }

  angleMode(DEGREES);
  background("#00f9ff");

  // inizializzo smoothing con il mouse
  smoothX = mouseX;
  smoothY = mouseY;
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // ammorbidisco le coordinate con lerp
    smoothX = lerp(smoothX, mouseX, 0.4);
    smoothY = lerp(smoothY, mouseY, 0.4);

    // coordinate relative al centro
    let dotX = round(smoothX - width / 2);
    let dotY = round(smoothY - height / 2);

    // reset sfondo con click
    if (windowWidth > 600 && mouseIsPressed) {
      background("#00f9ff");
    }

    // disegno i punti in tutti i settori
    for (let i = 0; i < symmetry; i++) {
      push();

      rotate(i * angle);

      noStroke();
      fill("#26150B");
      ellipse(dotX, dotY, 3, 3); // pallino principale

      // riflesso
      push();
      scale(1, -1);
      ellipse(dotX, dotY, 3, 3);
      pop();

      pop();
    }
  }
}

function windowResized() {
  setup();
}
