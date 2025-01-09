import { easing } from "jquery";

console.log("custom")
$(function () {
    //user一覧表示
    $('#room-open,.room-close-btn').on('click', function () {
      $(this).toggleClass('open');
      if($(this).hasClass('open')){
        $('.room-modal').css('display', 'block');
        $('.overlay').css('display', 'block');
      } else {
        $('.room-modal').css('display', 'none');
        $('.overlay').css('display', 'none');
      }
    });

    //プロフィール画面遷移やログアウトの表示
    $('.gear,.gear-close-btn').on('click', function () {
      console.log("gear")
      $('.gear-modal').toggleClass('open');
      if($('.gear-modal').hasClass('open')){
        $('.gear-modal').css('display', 'block');
        $('.overlay').css('display', 'block');
      } else {
        $('.gear-modal').css('display', 'none');
        $('.overlay').css('display', 'none');
      }
    });

    //スタンプの表示
    let currentSlide = 0;
    const totalSlides = 2; // スライドの総数
    $('.bms_stamp_btn').on('click', function () {
      $('.stamp-container').animate({bottom:'0px'},500);
    });

    // スタンプのスライド
    $('.stamp-container').on('click', function () {
      currentSlide = (currentSlide + 1) % totalSlides;
      const offset = -currentSlide * 350; // スライドの高さに合わせて調整
      $('.stamp-container-inner').css('transform', `translateY(${offset}px)`);
    });

    // スタンプの閉じるボタン
    $('.stamp-close-btn').on('click', function (event) {
      close_stamp(event);
    });

    function close_stamp(event) {
      event.stopPropagation();
      $('.stamp-container').animate({bottom:'-350px'},500 );
    }

    // スタンプを非同期で送信
    $('.stamp img').on('click', function (event) {
      event.stopPropagation(); 
      const stampId = $(this).data('id');
      const stampUrl = $(this).attr('src');

      console.log("スタンプ送信:", stampId, stampUrl);
      
      // コントローラにスタンプ情報を送信
      $.ajax({
        url: '/chatroom/send_stamp',
        type: 'POST',
        data: { stamp_id: stampId, stamp_url: stampUrl },
        success: function(data) {
          if (data.status === 'success') {
            const messageContainer = $('#messages'); // メッセージコンテナの指定を修正
            const message = document.createElement('div');
            message.id = `message-${data.message_id}`;
            message.className = `user_message ${data.current_user ? 'current_user_message' : 'other_user_message'}`;
            message.innerHTML = `
              <p class="user_status">
                <img src="${data.avatar_url}" alt="${data.username}のプロフィール画像" class="icon">
              </p>
              <div class="message">
                <strong class="username">${data.username}</strong>
                <p class="message-content"><img src="${data.stamp_url}" class="stamp-message"></p>
              </div>
              <img src="/assets/images/more_vert.png" class="more_vert" data-message-id="${data.message_id}">
              <div class="menu" id="menu-${data.message_id}">
                <div class="menu-content">
                  <p class="delete">
                    <a href="/chatroom/${data.message_id}/delete_message" data-method="delete" data-remote="true" class="delete-btn" data-confirm="本当によろしいですか？">メッセージを削除</a>
                  </p>
                  <p class="reaction">リアクション</p>  
                  <div class="emoji">
                    <emoji-picker data-message-id="${data.message_id}"></emoji-picker>
                  </div>
                </div>
              </div>
            `;
            messageContainer.append(message);
            close_stamp(event);
          } else {
            console.log("スタンプ送信エラー:", data.errors);
          }
        },
        error: function() {
          console.log("スタンプ送信エラー");
        }
      });
    });

    //メニューの表示
    $(document).on('click', '.more_vert', function (e) {
      e.stopPropagation();
      const messageId = $(this).data('message-id');
      const $menu = $(`#menu-${messageId}`);// 他のメニューを閉じる
      $menu.toggleClass('open');
    });

    //メニューの非表示
    $(document).on('click', function (event) {
        if ($(event.target).closest('.menu').length > 0)  {
            return; 
        }
        $('.menu').removeClass('open'); 
    }); 

    //非同期でメッセージの削除
    $(document).on('ajax:success', '.delete-btn', function(event) {
        const [data] = event.detail;
        console.log("削除レスポンス:", data);
        
        if (data.status === 'success') {
          const messageElement = $(`#message-${data.message_id}`);
          messageElement.fadeOut(400, function() {
            $(this).remove();
          });
        } else {
          alert('削除に失敗しました');
        }
    });

    //削除エラー時のアラート表示
    $(document).on('ajax:error', '.delete-btn', function(event) {
        alert('通信エラーが発生しました');
    });
});




