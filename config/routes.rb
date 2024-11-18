
Rails.application.routes.draw do
  # ユーザー登録用のルート
  resources :users, only: [:new, :create, :edit, :update, :show, :destroy]
  
  # セッション管理用のルート
  resources :sessions, only: [:new, :create, :destroy]
  
  resources :chatroom, only: [:new, :create, :show,:index,:update]
  
  # ログアウト用のルート
  delete '/logout', to: 'sessions#destroy'
  post 'create', to: 'chatroom#create', as: :create
  
  # ルートパスの設定
  root 'sessions#new'
end

