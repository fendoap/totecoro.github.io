// --- 設定項目 ---
const terrainSmoothness = 0.005; // 地形のなめらかさ
const scrollSpeed = 0.01;        // 地形がスクロールする速さ
const airplaneSize = 40;           // 飛行機の大きさ
// ---------------

let airplane;             // 飛行機オブジェクト
let scrollOffset = 0;     // 地形のスクロール位置
let lastCount = -1;       // BPM同期のための変数

/**
 * Airplaneクラス（飛行機の設計図）
 */
class Airplane {
  constructor() {
    // 飛行機の初期位置（X座標は画面左側に固定）
    this.pos = createVector(width / 5, height / 2);
    // 飛行機が次に向かう目標のY座標
    this.targetY = this.pos.y;
    this.size = airplaneSize;
  }
  
  // 毎フレームごとの動きを計算するメソッド
  update() {
    // lerp(現在の値, 目標の値, 近づく割合)
    // 現在のY座標を、目標のY座標に毎フレーム8%ずつ近づける
    // これにより、滑らかな動き（イージング）が生まれる
    this.pos.y = lerp(this.pos.y, this.targetY, 0.08);
  }

  // 自身の形を描画するメソッド
  display() {
    push(); // 現在の描画スタイルを保存
    translate(this.pos.x, this.pos.y); // 飛行機の位置に座標軸を移動
    
    fill(0);
    noStroke();
    
    // シンプルな三角形で飛行機を表現
    // triangle(先端x, 先端y, 後部上x, 後部上y, 後部下x, 後部下y)
    triangle(this.size / 2, 0, -this.size / 2, -this.size / 3, -this.size / 2, this.size / 3);
    
    pop(); // 保存した描画スタイルに戻す
  }

  // 新しい目標高度を設定するメソッド
  changeAltitude() {
    // 画面の上から20%〜60%の範囲で、ランダムな目標高度を設定
    this.targetY = random(height * 0.2, height * 0.6);
  }
}

/**
 * p5.jsの初期設定
 */
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  // 飛行機オブジェクトを生成
  airplane = new Airplane();
}

/**
 * p5.jsの描画ループ
 */
function draw() {
  background(255);

  // --- 地形の生成と描画 ---
  stroke(0);
  noFill();
  beginShape();
  for (let x = 0; x <= width; x++) {
    const noiseVal = noise(x * terrainSmoothness + scrollOffset);
    const y = map(noiseVal, 0, 1, height / 1.5, height);
    vertex(x, y);
  }
  endShape();

  // --- BPM同期 ---
  if (typeof count !== 'undefined' && count !== lastCount) {
    // 4分音符のタイミングで高度を変える
    if (count % 4 === 0) {
      airplane.changeAltitude();
    }
    lastCount = count;
  }
  
  // --- 飛行機の更新と描画 ---
  airplane.update();  // 位置を計算
  airplane.display(); // 形を描画

  // --- スクロール ---
  // 地形の参照位置を少しずつずらす
  scrollOffset += scrollSpeed;
}

/**
 * ウィンドウサイズが変更されたときに呼び出される関数
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}