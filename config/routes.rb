Rails.application.routes.draw do
  # ユーザー登録用のルート
  resources :users, only: [:new, :create]
  
  # セッション管理用のルート（タイポ修正 & 重複ルート削除）
  resources :sessions, only: [:new, :create]
  resources :chatroom, only: [:new, :create, :show]
  # ルートパスの設定
  root 'sessions#new'
end
