Rails.application.routes.draw do
  # ユーザー登録用のルート
  resources :users, only: [:new, :create, :edit, :update, :show, :destroy]
  # セッション管理用のルート
  resources :sessions, only: [:new, :create, :destroy]
  #チャットルーム管理用ルート
  resources :chatroom, only: [:index, :show, :new, :create, :update, :destroy, :edit] do
    member do
      delete :delete_message # メッセージ削除用のアクションを明示
    end
  end

  
  #メッセージ管理用ルート

  resources :messages do
    resources :reactions, only: [:create]  # reactionsのcreateアクションをPOSTに対応させる
    post 'stamps', to: 'chatroom#send_stamp'
  end 
  #スタンプ情報を受信するためのルート
  post 'chatroom/send_stamp', to: 'chatroom#send_stamp'
  
  # ログアウト用のルート
  delete '/logout', to: 'sessions#destroy',as: :logout
  patch '/delete', to: 'chatroom#destroy', as: :delete
  post 'create', to: 'chatroom#create', as: :create
 get 'reset', to: 'users#forget_view'
  post 'messages/:message_id/stamps', to: 'chatroom#send_stamp'
  # ルートパスの設定
  root 'users#main'
  mount ActionCable.server => '/cable'
end

