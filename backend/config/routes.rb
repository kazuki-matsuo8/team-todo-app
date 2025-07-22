Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update, :show, :destroy]
      resources :tasks, only: [:index, :create, :update, :destroy, :show]
      resources :password_resets, only: [:create, :update]
      post 'login', to: 'authentications#create'
      delete 'logout', to: 'authentications#destroy'
    end    
  end
end
