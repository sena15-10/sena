class SessionsController < ApplicationController
    def new
        @user = User.new  # 新しいUserオブジェクトを作成
    end
    def create
       puts "ログイン処理です"
        @user = User.find_by(email: params[:email]) #条件が一致する初めのレコードを返す
        if @user&.authenticate(params[:password]) #authenticateメソッドは、ユーザーが入力したパスワードと保存されたハッシュ化されたパスワードを比較
            session[:user_id] = @user.id
            flash.now[:alert] ="ログイン成功しました"
            redirect_to new_chatroom_path #ログイン後のページをredirect_toの後に書く
        else 
            flash.now[:alert] = "メールアドレスまたはパスワードが正しくありません"
            render :main  #失敗したら同じページをロード
        end 
    end 


    def main
        @user = User.new
    end
    def destroy
        puts "ログアウトしました"
        session[:user_id] = nil
        flash[:notice] = "ログアウトしました"
        redirect_to root_url
    end
end
