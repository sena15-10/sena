class UsersController < ApplicationController
    def new
        @user = User.new
      end
    
      def create
        @user = User.new(user_params)#メソッドuser_paramsで返したものが入る
        puts "#{@user}"
        if @user.save #ここでデータベースに保存
          puts @user.errors.full_messages 
          redirect_to root_path
        else
            render :new
            puts @user.errors.full_messages 
            puts "登録できない"
        end
      end
    
      private #外部からのアクセスが不可能
    
      def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
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

