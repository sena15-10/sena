class ApplicationController < ActionController::Base
        helper_method :current_user # ビューでも使用できるように設定
      
        rescue_from StandardError do |exception|
            render json: { status: 'error', message: exception.message }, status: 500
        end
    def current_user
        @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end
      
    def logged_in?
        # ユーザーがログインしているかどうかを判定
        !!current_user #これはユーザーがログインしている真偽値で返すメソッド
    end
end
