Stats::Engine.routes.draw do
  namespace :stats, path: "" do
    get "stats" => "stats#stats"
  end
end
