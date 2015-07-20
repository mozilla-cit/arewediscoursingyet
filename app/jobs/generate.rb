module Stats
  class Generate < Jobs::Scheduled
    every 1.minute

    def execute(args)
      unless SiteSetting.awdy_enabled
        puts 'AWDY DISABLED'
        return
      end

      puts 'AWDY GENERATING'
      stats = { :new_users_by_date => {} }
      User.all.each do |u|
        date = u.attributes['created_at'].strftime('%F')
        stats[:new_users_by_date][date] = stats[:new_users_by_date][date].to_i + 1
      end
      ::PluginStore.set('awdy', 'stats', stats)
    end
  end
end
