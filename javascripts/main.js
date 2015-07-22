var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format('%Y-%m-%d')
var parseDate = formatDate.parse;

var x = d3.time.scale()
        .range([0, width]);

var y = d3.scale.linear()
        .range([height, 0]);

var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

var line = d3.svg.line()
           .x(function (d) { return x(d.date) })
           .y(function (d) { return y(d.users) });

var svg = d3.select('body')
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.json('http://csa-discourse.mofostaging.net/awdy/stats.json', function (error, stats) {
  if (error) throw error

  var new_users_by_date = stats.new_users_by_date.data

  var oldestDay = new Date()

  for (var day in new_users_by_date) {
    var date = parseDate(day)
    if (date < oldestDay)
      oldestDay = date
  }

  oldestDay = d3.time.month.floor(oldestDay)

  var days = d3.time.day.range(oldestDay, new Date())
  var data = new Array(days.length)
  var lastNumber = 0

  days.forEach(function (day, index) {
    var dayString = formatDate(day)
    data[index] = {}
    data[index].date = day
    var number = new_users_by_date[dayString]
    if (number) {
      lastNumber += number
      data[index].users = lastNumber
    } else {
      data[index].users = lastNumber
    }
  })

  x.domain(d3.extent(data, function (d) { return d.date }))
  y.domain(d3.extent(data, function (d) { return d.users }))

  svg.append('g')
       .attr('class', 'x axis')
       .attr('transform', 'translate(0,' + height + ')')
       .call(xAxis);

  svg.append('g')
       .attr('class', 'y axis')
       .call(yAxis)
     .append('text')
       .attr('transform', 'rotate(-90)')
       .attr('y', 6)
       .attr('dy', '.71em')
       .style('text-anchor', 'end')
       .text('Total Users');

  svg.append('path')
       .datum(data)
       .attr('class', 'line')
       .attr('d', line);
});
