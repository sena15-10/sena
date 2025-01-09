class ApplicationController < ActionController::Base
        helper_method :current_user # ビューでも使用できるように設定
      
    def current_user
        @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end
      
    def logged_in?
        # ユーザーがログインしているかどうかを判定
        !!current_user #これはユーザーがログインしている真偽値で返すメソッド
    end

    after_action :clear_flash

    private

    def clear_flash
       flash.clear if request.xhr?
    end

    def new
        @user = User.new
    end
end
