import consumer from "./consumer"

consumer.subscriptions.create("MessageChannel", {
  connected() {
    console.log("Connected to MessageChannel");
  },

  disconnected() {
    console.log("Disconnected from MessageChannel");
  },

  received(data) {
    console.log("Received data in MessageChannel" + data)
    const chatBox = document.getElementById("messages");
    if (data.action === 'create') {
      const message = document.createElement("div");
      message.id = `message-${data.id}`;
      message.className = `user_message ${data.current_user ? 'current_user_message' : 'other_user_message'}`;
      message.innerHTML = `
        <p class="user_status">
          <img src="${data.avatar_url}" alt="${data.username}のプロフィール画像" class="icon">
        </p>
        <div class="message">
          <strong class="username">${data.username}</strong>
          <p class="message-content">${data.content}</p>
          <div class="reactions">

          </div>
        </div>
        <img src="/assets/more_vert.png" class="more_vert" data-message-id="${data.message_id}">
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
      chatBox.appendChild(message);
    }
  },

});
