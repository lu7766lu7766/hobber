document.addEventListener("DOMContentLoaded", () => {
  // --- 獲取所有需要的 DOM 元素 ---
  const homeContainer = document.getElementById("home-container");
  const writePage = document.getElementById("write-page");
  const readPage = document.getElementById("read-page");

  const sendButton = document.getElementById("send-button");
  const receiveButton = document.getElementById("receive-button");
  const backButtons = document.querySelectorAll(".back-button");

  const letterInput = document.getElementById("letter-input");
  const commitSendButton = document.getElementById("commit-send-button");
  const messageBox = document.getElementById("message-box");

  const animationContainer = document.getElementById("animation-container");
  const letterDisplay = document.getElementById("letter-display");
  const pickAnotherButton = document.getElementById("pick-another-button");

  const LETTERS_KEY = "harbor_of_memories_letters";

  // --- 函數：切換頁面 ---
  function showPage(pageElement) {
    // 先隱藏主頁，並移除其他頁面的 active 狀態
    homeContainer.style.opacity = "0";
    homeContainer.style.pointerEvents = "none"; // 讓主頁無法被點擊
    writePage.classList.remove("active");
    readPage.classList.remove("active");

    if (pageElement) {
      // 顯示指定的頁面
      pageElement.classList.add("active");
    } else {
      // 如果沒有指定頁面，就是返回主頁
      homeContainer.style.opacity = "1";
      homeContainer.style.pointerEvents = "auto"; // 恢復主頁點擊
    }
  }

  // --- 函數：儲存信件 ---
  function saveLetter() {
    const content = letterInput.value.trim();
    if (content === "") {
      messageBox.textContent = "信件不能是空的喔。";
      setTimeout(() => (messageBox.textContent = ""), 3000);
      return;
    }

    // 從 localStorage 獲取舊信件，若無則建立空陣列
    const letters = JSON.parse(localStorage.getItem(LETTERS_KEY)) || [];
    // 新增信件
    letters.push(content);
    // 存回 localStorage
    localStorage.setItem(LETTERS_KEY, JSON.stringify(letters));

    letterInput.value = ""; // 清空輸入框
    messageBox.textContent = "您的回憶已投入大海。";
    setTimeout(() => (messageBox.textContent = ""), 3000);
  }

  // --- 函數：顯示隨機信件 (包含動畫) ---
  function showRandomLetter() {
    const letters = JSON.parse(localStorage.getItem(LETTERS_KEY)) || [];

    // 隱藏信件內容，顯示動畫
    letterDisplay.style.display = "none";
    animationContainer.style.display = "flex";

    // 動畫持續 2.5 秒
    setTimeout(() => {
      // 隱藏動畫，顯示信件內容
      animationContainer.style.display = "none";
      letterDisplay.style.display = "flex";

      if (letters.length > 0) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        letterDisplay.textContent = letters[randomIndex];
      } else {
        letterDisplay.textContent = "海面很平靜，還沒有漂流瓶...";
      }
    }, 2500);
  }

  // --- 綁定事件監聽 ---
  sendButton.addEventListener("click", () => showPage(writePage));
  receiveButton.addEventListener("click", () => {
    showPage(readPage);
    showRandomLetter(); // 第一次進入時就顯示一封信
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => showPage(null));
  });

  commitSendButton.addEventListener("click", saveLetter);
  pickAnotherButton.addEventListener("click", showRandomLetter);
});
