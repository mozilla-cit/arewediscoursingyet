module Stats
  class NewUsersByDate < Stats::Job
    every 1.minute

    def name
      return 'new_users_by_date'
    end

    def run(args)
      data = {}
      User.all.each do |u|
        date = u.attributes['created_at'].strftime('%F')
        data[date] = data[date].to_i + 1
      end
      yield data
    end
  end
end
