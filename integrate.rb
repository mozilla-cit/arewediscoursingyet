# mount engine
Discourse::Application.routes.append do
  mount Stats::Engine, at: '/awdy'
end
