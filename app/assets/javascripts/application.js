
console.log("HELLO");
console.log("meinのなかに書いています");
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
      console.log("Register modal opened");
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

// var flashMessage = document.getElementById('flash-message');
// if (flashMessage) {
//   setTimeout(function() {
//     flashMessage.style.display = 'none';
//   }, 5000); // 5秒後にメッセージを非表示にする
// }

// // パスワードフィールドの処理
// document.addEventListener('DOMContentLoaded', function() {
//   var passwordField = document.getElementById('password-field');
//   var passwordFeedback = document.getElementById('password-feedback');

//   if (passwordField && passwordFeedback) {
//     passwordField.addEventListener('input', function() {
//       var currentLength = this.value.length;
//       var remainingChars = 8 - currentLength;
//       if (remainingChars > 0) {
//         passwordFeedback.textContent = '現在の文字数: ' + currentLength + ' (あと' + remainingChars + '文字必要です)';
//       } else {
//         passwordFeedback.textContent = '現在の文字数: ' + currentLength + ' (必要文字数を満たしています)';
//       }
//     });
//   } 
  
// });


// // モーダルを取得
// var loginModal = document.getElementById("loginModal");
// var registerModal = document.querySelector("registerModal");

// // モーダルを開くボタンを取得
// var registerBtn = document.getElementById("registerBtn");
// console.log(`${loginModal}\nregisterModal:${registerModal}\nloginBtn:${loginBtn}\nregisterBtn:${registerBtn}`)
// // モーダルを閉じる <span> 要素を取得
// var closeButtons = document.getElementsByClassName("close");

//　ボタンがクリックされたときにモーダルを開く


// registerBtn.onclick = function() {
//   registerModal.style.display = "block";
// }

// // <span> 要素がクリックされたときにモーダルを閉じる
// for (let i = 0; i < closeButtons.length; i++) {
//   closeButtons[i].onclick = function() {
//     loginModal.style.display = "none";
//     registerModal.style.display = "none";
//   }
// }

// // モーダル外がクリックされたときにモーダルを閉じる
// window.onclick = function(event) {
//   if (event.target == loginModal || event.target == registerModal) {
//     loginModal.style.display = "none";
//     registerModal.style.display = "none";
//   }
// }