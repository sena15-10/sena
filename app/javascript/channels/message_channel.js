import consumer from "./consumer"

consumer.subscriptions.create("MessageChannel", {
  connected() {
    console.log("Connected to room")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log("Received:", data);
      const chatBox = document.getElementById("messages");
      const message = document.createElement("p");
      
      message.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.username}のプロフィール画像" class="icon">
      <strong>${data.username}:</strong> ${data.content}
    `;
      chatBox.appendChild(message);
    },
    speak(message) {
      this.perform("speak", { message: message });
    },

   
});
