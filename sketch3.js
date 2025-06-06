let textStr = "f-o-o-t-s-t-e-p-s-足-音-f-o-o-t-s-t-e-p-s-足-音-f-o-o-t-s-t-e-p-s-f-o-o-t-s-t-e-p-s-足-音-f-o-o-t-s-t-e-p-s-足-音-f-o-o-t-s-t-e-p-s-";
let fontSize = 48;

function setup() {
  // ウィンドウサイズのキャンバスを作成
  const canvas = createCanvas(windowWidth, windowHeight);
  
  // ★重要：作成したキャンバスをHTMLの #canvas-container の中に配置する
  canvas.parent('canvas-container');

  textSize(fontSize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);
  let baseX = width / 2 - textWidth(textStr) / 2;
  // アニメーションの速度を少し上げました（お好みで調整してください）
  let t = millis() * 0.0001; 
  for (let i = 0; i < textStr.length; i++) {
    let charX = textWidth(textStr.substring(0, i)) + fontSize / 2;
    let charY = height / 2 + sin(t * 2 + i * 0.5) * (height / 2 - 50); // 振幅を画面サイズに連動
    let alpha = 18 + sin(t * 2 + i * 0.8) * 180;
    let s = fontSize + sin(t * 1.5 + i * 0.7) * 6;
    fill(100, 100, 100, alpha);
    textSize(s);
    text(textStr[i], charX, charY);
  }
  fill(50, 150, 150);
  textSize(48 * 0.5);
  text("足音コンピ", width / 2, height / 2);
  textSize(48 * 0.2);
}

/**
 * ★追加：ウィンドウサイズが変更されたときに呼び出される関数
 */
function windowResized() {
  // キャンバスを新しいウィンドウサイズに合わせる
  resizeCanvas(windowWidth, windowHeight);
}