let stars = []; // 星を格納する配列
let rings = []; // リングを格納する配列

let starSpeed = 2;      // 星の移動速度
let ringSpeed = 5;      // リングの移動速度
let numStars = 500;     // 星の数
let numRings = 15;      // リングの数
let farDistance = 2000; // オブジェクトが再配置される奥の距離

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // ライティング設定
  ambientLight(80); // 少し明るく
  directionalLight(255, 255, 255, 0.5, 0.5, -1);

  // 星を初期化
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }

  // リングを初期化
  for (let i = 0; i < numRings; i++) {
    rings.push(new Ring());
  }
}

function draw() {
  background(0);
  // orbitControl(); // 必要に応じて有効化してください

  // カメラ位置を少し後ろに引く (オブジェクトが手前に流れてくるのを見やすくするため)
  // camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0) + 200, 0, 0, 0, 0, 1, 0);
  // 上記のcamera設定だと固定されてしまうので、デフォルトカメラでオブジェクトを動かす方がシンプル

  // --- 星の更新と描画 ---
  for (let star of stars) {
    star.update();
    star.display();
  }

  // --- リングの更新と描画 ---
  for (let ring of rings) {
    ring.update();
    ring.display();
  }

  // --- 中心に留まる機械的なオブジェクト（回転する立方体）を描画 ---
  push();
  translate(0, 0, -100); // 少し奥に配置して、手前をリングが通過するように
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  fill(180, 180, 180, 220);
  stroke(255);
  strokeWeight(1.5);
  box(80); // 少し小さく
  pop();
}

// --- Star クラス ---
class Star {
  constructor() {
    this.x = random(-width * 1.5, width * 1.5);
    this.y = random(-height * 1.5, height * 1.5);
    this.z = random(0, -farDistance); // 初期位置を奥に
    this.size = random(1, 4);
  }

  update() {
    this.z += starSpeed; // 手前に移動

    // 画面手前（Z=0のカメラ平面より少し奥）を通り過ぎたら奥に再配置
    if (this.z > 200) { // カメラより少し手前で見えなくなる位置で再配置
      this.z = random(-farDistance, -farDistance + 200);
      this.x = random(-width * 1.5, width * 1.5);
      this.y = random(-height * 1.5, height * 1.5);
    }
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    fill(255);
    sphere(this.size);
    pop();
  }
}

// --- Ring クラス ---
class Ring {
  constructor() {
    this.z = random(0, -farDistance * 1.5); // 星よりさらに奥から出現させることも
    this.initRing();
  }

  initRing() {
    this.x = random(-width / 4, width / 4); // X,Yのばらつきを少し抑える
    this.y = random(-height / 4, height / 4);
    this.z = random(-farDistance * 1.2, -farDistance * 1.5); // 再配置時のZ座標
    this.radius = random(80, 250); // リングの半径
    this.tubeRadius = random(5, 20); // リングのチューブの半径
    this.rotationX = random(TWO_PI);
    this.rotationY = random(TWO_PI);
    this.rotationZ = random(TWO_PI);
    this.rotationSpeedX = random(-0.01, 0.01);
    this.rotationSpeedY = random(-0.005, 0.005);
    this.col = color(random(100, 255), random(100, 255), random(100, 255), 180); // 半透明でランダムな色
    this.strokeCol = color(255, 255, 255, 200);
  }

  update() {
    this.z += ringSpeed; // 手前に移動

    this.rotationX += this.rotationSpeedX;
    this.rotationY += this.rotationSpeedY;

    // 画面手前を通り過ぎたら奥に再配置
    if (this.z > 200) {
      this.initRing(); // パラメータをリセットして再配置
    }
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(this.rotationX);
    rotateY(this.rotationY);
    rotateZ(this.rotationZ); // Z軸にも初期回転

    noFill(); // トーラスは枠線だけで描画するとミニマル感が出る場合も
    // fill(this.col); // または色をつける
    stroke(this.strokeCol);
    strokeWeight(1); // 細めの線で
    torus(this.radius, this.tubeRadius, 24, 8); // detailX, detailYを調整して滑らかさを変更
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
