import Rails from '@rails/ujs';
import "emoji-picker-element"; 
require('jquery')
Rails.start();
import 'channels';
import './custom'

var element = document.documentElement;
var bottom = element.scrollHeight - element.clientHeight;
window.scroll(0, bottom);

document.addEventListener('DOMContentLoaded', () => {
  const emojiPickers = document.querySelectorAll('emoji-picker');
  console.log("Number of emoji pickers found:", emojiPickers.length);
  emojiPickers.forEach((picker) => {
    picker.addEventListener('emoji-click', event => {
      const messageId = picker.dataset.messageId;
      const emoji = event.detail.unicode;
      console.log(`Message ID: ${messageId}, Emoji: ${emoji}`);
      fetch(`/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Rails.csrfToken()
        },
        body: JSON.stringify({ reaction: { emoji: emoji } })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          updateReactionDisplay(messageId, data.reaction);
        } else {
          console.log('Fetch error:');
        }
      });
    });
  });
});


function updateReactionDisplay(messageId, reaction) {
  const reactionContainer = document.querySelector(`#message-${messageId} .reactions`);
  const reactionElement = document.createElement('span');
  reactionElement.textContent = reaction.emoji;
  reactionElement.dataset.reactionId = reaction.id;
  reactionContainer.appendChild(reactionElement);
}

document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const allCloseBtns = document.querySelectorAll(".close");

  loginBtn.onclick = function() {
    loginModal.style.display = "block";
    console.log("Login modal opened");
  };

  registerBtn.onclick = function() {
    registerModal.style.display = "block";
  };

  allCloseBtns.forEach(function(btn) {
      btn.onclick = function() {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
        console.log("Modal closed");
      };
  });

  window.onclick = function(event) {
    if (event.target == loginModal || event.target == registerModal) {
      loginModal.style.display = "none";
      registerModal.style.display = "none";
      console.log("Modal closed");
    }
  };
});

function goBack() {
  window.history.back();  // 前のページに戻る
}

document.addEventListener("DOMContentLoaded", () => {
const fileInput = document.getElementById("file-input"); // ファイル入力
const avatarPreview = document.getElementById("current-avatar"); // 現在の画像
const submitButton = document.getElementById("submit-button"); // 更新ボタン

// ファイル入力が変更されたときの処理
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  
  if (file) {
    // ファイルのURLを作成してプレビューに表示
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.src = e.target.result; // プレビューを新しい画像に更新
    };
    reader.readAsDataURL(file);
  }
});
});
