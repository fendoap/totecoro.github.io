// main.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) シンセを生成して出力先（スピーカー）に接続
  const synth = new Tone.Synth({
    oscillator: { type: "sine" }, // サイン波
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 1 },
  }).toDestination();

  // 2) スライダーの値を画面に表示＆シンセの周波数に反映
  const freqSlider = document.getElementById("freqSlider");
  const freqLabel = document.getElementById("freqLabel");
  freqSlider.addEventListener("input", (e) => {
    const freq = e.target.value;
    freqLabel.textContent = freq;
    synth.oscillator.frequency.value = freq;
  });

  // 3) ボタンで音を鳴らす。ユーザー操作イベント内で AudioContext を start する必要がある
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", async () => {
    await Tone.start();           // ブラウザ側の音声再生許可をクリア
    synth.triggerAttackRelease("C4", "8n"); // 8分音符の長さで C4 を鳴らす
  });
});
