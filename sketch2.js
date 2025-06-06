let textStr = "f-o-o-t-s-t-e-p-s-足-音-f-o-o-t-s-t-e-p-s-足-音-f-o-o-t-s-t-e-p-s-";
let fontSize = 48;

function setup() {
  createCanvas(800, 800);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);
  let baseX = width / 2 - textWidth(textStr) / 2;
  let t = millis() * 0.00005;
  for (let i = 0; i < textStr.length; i++) {
    let charX = baseX + textWidth(textStr.substring(0, i)) + fontSize / 2;
    let charY = height / 2 + sin(t * 2 + i * 0.5) * 400;
    let alpha = 180 + sin(t * 2 + i * 0.8) * 180;
    let s = fontSize + sin(t * 1.5 + i * 0.7) * 6;
    fill(100, 100, 100, alpha);
    textSize(s);
    text(textStr[i], charX, charY);
  }
  fill(150, 150, 150);
  textSize(48 * 0.5);
  text("足音コンピ", width / 2, height / 2 );
  textSize(48 * 0.2);
  text("足音コンピ", width / 2, height / 2 + 100);
}

