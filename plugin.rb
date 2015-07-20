# name: arewediscoursingyet
# about: plugin exposing stats we want to display on arewediscoursingyet.com
# version: 0.0
# authors: Leo McArdle

# load the engine
load File.expand_path('../lib/stats/engine.rb', __FILE__)

# integrate with Discourse
after_initialize do
  require_dependency File.expand_path('../integrate.rb', __FILE__)

  load File.expand_path("../app/jobs/generate.rb", __FILE__)

  ::PluginStore.remove('awdy', 'stats')
end
