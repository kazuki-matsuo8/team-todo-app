Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :tasks
      post 'login', to: 'authentications#create'
      delete 'logout', to: 'authentications#destroy'
    end    
  end
end
