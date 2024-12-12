class ReactionsController < ApplicationController

    def create
        @message = Message.find(params[:message_id])
        @reaction = @message.reactions.build(reaction_params)
        @reaction.user = current_user  # ここを有効にする
        puts "#{current_user.inspect}"
        if @reaction.save
            puts "絵文字の保存に成功しました"
            render json: { status: 'success', reaction: @reaction }  # 保存成功時にJSONでレスポンス
        else
            puts @reaction.errors.full_messages # ここでエラーを確認
            puts "あああああああああああああああああああ"
            render json: { status: 'error' }  # エラー時のレスポンス
        end
    end


    private

    def reaction_params
      params.require(:reaction).permit(:emoji)
    end
end
