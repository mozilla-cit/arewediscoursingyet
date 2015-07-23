module Stats
  class StatsController < ApplicationController
    def index
      stats = ::PluginStore.get('awdy', 'stats')
      stats = { 'error' => 'job not run yet' } if stats.nil?
      render json: JSON.pretty_generate(stats)
    end
  end
end
