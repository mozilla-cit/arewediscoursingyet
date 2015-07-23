Stats::Engine.routes.draw do
  namespace :stats, path: "" do
    get "stats" => "stats#index"
  end
end
