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
        <img src="/assets/images/more_vert.png" class="more_vert">
        <div class="menu" id="menu-${data.id}">
          <!-- メニューの内容をここに追加 -->
        </div>
      `;
      chatBox.appendChild(message);
    }
  },

});
