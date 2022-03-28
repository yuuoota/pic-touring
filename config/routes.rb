Rails.application.routes.draw do
  devise_for :users
  root to: "posts#index"
  resources :posts do
    resources :comments, only: :create
    collection do
      get 'searching'
      get 'search'
    end
  end
  get '/post/hashtag/:name', to: "posts#hashtag"
end
