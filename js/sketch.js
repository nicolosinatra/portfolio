// Numero di settori simmetrici
let symmetry = 6;
let angle = 360 / symmetry;

// variabili per smoothing
let smoothX, smoothY;

// variabili per blink effect
// let opacity = 0;
let mouseXPrev = 0;
let mouseYPrev = 0;
let showBlink = true;  // mostra il blink finché il mouse non si muove
let mouseMovedOnce = false;

function setup() {
  if (windowWidth < 600) {
    createCanvas(windowWidth, windowHeight - 47 - 28);
  } else if (windowWidth < 1024) {
    createCanvas(windowWidth, windowHeight - 52.5 - 35);
  } else {
    createCanvas(windowWidth, windowHeight - 55 - 42); // togli dimensione header e footer
  }

  angleMode(DEGREES);
  background("#00f9ff");

  // inizializzo smoothing con il mouse
  smoothX = mouseX;
  smoothY = mouseY;
}

function draw() {
  translate(width / 2, height / 2);

  if (showBlink && !mouseMovedOnce) {
    background("#00f9ff");

    // effetto pulsazione: opacity va avanti e indietro
    // opacity = 128 + 127 * sin(frameCount * 2);

    noStroke();
    fill(2, 21, 11);
    ellipse(0, 0, 8 + 8 * sin(frameCount * 2));

    // controlla se il mouse si muove
    if (mouseX !== mouseXPrev || mouseY !== mouseYPrev) {
      mouseMovedOnce = true;
      fadingOut = true;
    }
    return; // non disegnare altro
  }else {
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
}

function windowResized() {
  setup();
}

