let count = 0;
let cps = 0;
let clickTimes = []; // クリックのタイムスタンプ配列
let lastClickTime = 0;

const clickArea = document.getElementById('clickArea');
const clickCount = document.getElementById('clickCount');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('doubleClickMessage');

clickArea.addEventListener('click', () => {
  const now = Date.now();

  // ダブルクリック検出（0.3秒以内）
  if (now - lastClickTime <= 60) {
    message.textContent = "チャタリング";
    setTimeout(() => {
      message.textContent = "";
    }, 1000);
  }

  lastClickTime = now;

  // カウントアップ
  count++;
  clickTimes.push(now);
  updateDisplay();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  clickTimes = [];
  clickCount.textContent = "クリック数: 0 | CPS: 0";
  message.textContent = "";
});

// 1秒ごとにCPS更新
setInterval(() => {
  const now = Date.now();
  // 直近1秒以内のクリックだけ残す
  clickTimes = clickTimes.filter(t => now - t <= 1000);
  cps = clickTimes.length;
  updateDisplay();
}, 100);

function updateDisplay() {
  clickCount.textContent = `クリック数: ${count} | CPS: ${cps}`;
}

