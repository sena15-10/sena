class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak
    message = data["message"]
    console.log("Message to send:", message);  
    ActionCable.server.broadcast "chat_channel", { message: message }
  end

  def send_message(data)

    message = Message.create(content: data['message'], user: current_user)
    ActionCable.server.broadcast "chat_channel", {
      message: message.content,
      username: message.user.username,
      avatar_url: message.user.avatar.url
    }
  end
end
