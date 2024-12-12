class ChatroomController < ApplicationController
    before_action :require_login

    def index
        @messages = Message.includes(:user).order(:created_at)
        @message = Message.new
    end
    
    def new
        @messages = Message.includes(:user).order(:created_at)
        @message = Message.new
    end
      
    def show
        @current_user = current_user
    end
      
    


    def create
        @message = current_user.messages.build(message_params)
        if @message.save
            ActionCable.server.broadcast "chat_channel", {
                username: @message.user.username,
                avatar_url: @message.user.avatar.url,
                content: @message.content
            }
        else
          @messages = Message.includes(:user).order(:created_at)
          render :new, alert: 'メッセージの送信に失敗しました。'
        end
    end   
    
    def destroy
    end
    
    private

    def message_params
        puts params
        params.require(:message).permit(:content)
    end
      
    def require_login
        unless logged_in?
            flash[:alert] = "ログインが必要です"
            redirect_to new_session_path # ログイン画面にリダイレクト
        end
    end
end
