var apiData = {
  "new_users_by_date": {
    "2014-03-01": 1,
    "2015-07-20": 1000,
    "2014-12-07": 1,
    "2014-12-15": 1,
    "2014-12-16": 1,
    "2014-12-19": 1,
    "2014-12-08": 2,
    "2014-12-20": 1,
    "2014-12-13": 1,
    "2015-01-12": 2,
    "2014-12-14": 1,
    "2015-01-09": 1,
    "2014-12-06": 4,
    "2015-02-07": 1,
    "2015-07-08": 1,
  }
}

var oldestDay = moment()

for (var day in apiData.new_users_by_date) {
  var date = moment(day)
  if (date < oldestDay)
    oldestDay = date
}

oldestDay.startOf('month')

var days = moment().diff(oldestDay, 'days')
var labels = new Array(days)
var series = new Array(days)
var lastNumber = 0

for (var index = 0; index < days; index++) {
  var day = moment(oldestDay).add(index, 'days')
  var dayString = day.format('YYYY-MM-DD')
  var number = apiData.new_users_by_date[dayString]
  if (number) {
    lastNumber += number
    series[index] = lastNumber
  } else if (!index) {
    series[index] = 0
  }
}

for (var index = 0; index < days; index++) {
  var day = moment(oldestDay).add(index, 'days')
  if (!index || !day.month())
    var dayString = day.format('MMM ’YY')
  else
    var dayString = day.format('MMM')
  var dayOfMonth = day.date()
  if (dayOfMonth === 1)
    labels[index] = dayString
}

var data = {
  labels: labels,
  series: [
    series
  ]
}

var options = {
  //showPoint: false,
  //lineSmooth: false,
  lineSmooth: Chartist.Interpolation.step({
    postpone: true
  }),
  axisX: {
    onlyInteger: true
  },
  axisY: {
    onlyInteger: true,
  }
}

new Chartist.Line('.ct-chart', data, options)
