class ChatroomController < ApplicationController
    before_action :require_login
      
    def show
        @current_user = current_user
    end
      


    def new
    end

    def create
    end   
    
    
    private
      
    def require_login
        unless logged_in?
            flash[:alert] = "ログインが必要です"
            redirect_to new_session_path # ログイン画面にリダイレクト
        end
    end
end
