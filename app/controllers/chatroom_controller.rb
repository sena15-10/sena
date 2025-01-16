class ChatroomController < ApplicationController
  before_action :require_login
  skip_before_action :verify_authenticity_token, only: [:send_stamp]

  def index
    @messages = Message.includes(:user).order(:created_at)
    @message = Message.new
  end

  def new
    @messages = Message.includes(:user).order(:created_at)
    @message = Message.new
    @users = User.all
  end

  def show
    @current_user = current_user
  end

  def create
    @message = current_user.messages.build(message_params)
    if @message.save
      ActionCable.server.broadcast "chat_channel", {
        action: 'create',
        id: @message.id,
        username: @message.user.username,
        avatar_url: @message.user.avatar.url,
        content: @message.content,
        current_user: current_user == @message.user
      }
    else
      render json: { status: 'error', errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def delete_message
    @message = Message.find(params[:id])
    if @message.update(deleted: true)
      render json: { status: 'success', message_id: @message.id }
    else
      render json: { status: 'error', errors: @message.errors.full_messages }
    end
  end

  def send_stamp
    @message = current_user.messages.build(content: params[:stamp_url])
    if @message.save
      render json: { 
      status: 'success', 
      message_id: @message.id, 
      stamp_url: @message.content,
      username: @message.user.username,
      avatar_url: @message.user.avatar.url,
      current_user: current_user == @message.user
    }
    else
      render json: { status: 'error', errors: @message.errors.full_messages }
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

  def require_login
    unless logged_in?
      flash[:alert] = "ログインが必要です"
      redirect_to new_session_path
    end
  end
end
