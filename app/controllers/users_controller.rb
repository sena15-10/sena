# app/controllers/users_controller.rb

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :require_correct_user, only: [:edit, :update, :destroy]

  def new
    @user = User.new
  end


  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'ユーザーが正常に作成されました。'
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    # ユーザーのプロフィールページ
  end

  def edit
    # editビューを表示
  end

  def update
    
    if @user.update(user_avatar_params)
      flash[:notice] = 'ユーザー情報が更新されました。'
      redirect_to new_chatroom_url
    else
      puts ("Validation errors: #{@user.errors.full_messages.join(', ')}")
      puts ("エラー")
      flash.now[:alert] = '更新に失敗しました。入力内容を確認してください。'
      redirect_to new_chatroom_url
    end
  end

  def destroy
    @user.destroy
    flash[:notice] = 'ユーザーが削除されました。'
    redirect_to root_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  # 自分自身のみが編集・更新・削除できるように制限
  def require_correct_user
    unless @user == current_user
      flash[:alert] = '権限がありません。'
      redirect_to root_path
    end
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
  end

  def user_avatar_params
    params.require(:user).permit(:avatar)
  end
end

=begin   
上の四つの属性がホワイトリストに追加される
        {
  "username" => "testuser",
  "email" => "test@example.com",
  "password" => "password123",
  "password_confirmation" => "password123"
}      
だけ保存される。悪意あるユーザーがis_godという新しいデータを保存しようとしても
保存しない。
セキュリティ面で優秀
=end

