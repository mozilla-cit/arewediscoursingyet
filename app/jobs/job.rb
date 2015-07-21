module Stats
  class Job < Jobs::Scheduled

    def name
      raise "Overwrite me!"
    end

    def run(opts={})
      raise "Overwrite me!"
    end

    def execute(args)
      return unless SiteSetting.awdy_enabled

      now = Time.new().utc

      Rails.logger.info "AWDY: starting #{name} generation... (#{now})"

      time = Benchmark.realtime {
        run(args) {|data|
          stats = ::PluginStore.get('awdy', 'stats')
          stats = {} if stats.nil?
          stats[name] = {} if stats[name].nil?
          stats[name]['data'] = data
          ::PluginStore.set('awdy', 'stats', stats)
        }
      }

      Rails.logger.info "AWDY: finished #{name} (took: #{time.round(2)}s)"

      stats = ::PluginStore.get('awdy', 'stats')
      stats[name]['stats'] = { 'started' => now, 'took' => time.round(2) }
      ::PluginStore.set('awdy', 'stats', stats)

    end
  end
end
