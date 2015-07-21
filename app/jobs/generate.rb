#require_dependency 'benchmark'

module Stats
  class Generate < Jobs::Scheduled
    every 1.minute

    def execute(args)
      unless SiteSetting.awdy_enabled
        Rails.logger.info 'AWDY disabled'
        return
      end

      now = Time.new().utc

      Rails.logger.info "AWDY starting stats generation... (#{now})"

      time = Benchmark.realtime {
        stats = { :new_users_by_date => {} }
        User.all.each do |u|
          date = u.attributes['created_at'].strftime('%F')
          stats[:new_users_by_date][date] = stats[:new_users_by_date][date].to_i + 1
        end
        ::PluginStore.set('awdy', 'stats', stats)
      }

      Rails.logger.info "AWDY finished (took: #{time.round(2)}s)"

    end
  end
end
