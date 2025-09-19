Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # ユーザー関連
      # 基本的なCRUD操作のみ許可
      resources :users, only: [ :create, :update, :show, :destroy ]
      # タスク関連
      # 一覧取得と基本的なCRUD操作
      resources :tasks, only: [ :index, :create, :update, :destroy, :show ]
      # チーム関連
      # ネストしたルーティングでチームメンバーを管理
      resources :teams do
        resources :members,
                 controller: "team_members",
                 only: [ :index, :create, :update, :destroy ]
      end
      # パスワードリセット
      resources :password_resets, only: [ :create, :update ]
      # 認証関連
      # セッション管理をシンプルに
      post "login", to: "authentications#create"
      delete "logout", to: "authentications#destroy"
    end
  end
end
