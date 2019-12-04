d3.csv("/home/stack.csv", chart);

function chart(csv) {
  var keys = csv.columns.slice(3);
  var level = csv.columns.slice(2);

  // store year and month into new sets
  var year = [...new Set(csv.map(d => d.year))];
  var month = [...new Set(csv.map(d => d.month))];

  var optionsYear = d3
    .select("#year")
    .selectAll("option")
    .data(year)
    .enter()
    .append("option")
    .text(d => d);

  var optionsSeverity = d3
    .select("#collision-type")
    .selectAll("option")
    .data(level)
    .enter()
    .append("option")
    .text(d => d);

  var svg = d3.select("#chart"),
    margin = { top: 80, left: 60, bottom: 0, right: 0 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .padding(0.1);

  var y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

  var xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .style("font-size", "1em");

  var yAxis = svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis");

  var colorScale = d3
    .scaleOrdinal()
    .range(["#FFC300", "#FF5733", "#C70039", "#900C3F"])
    .domain(keys);

  update(0);

  function update(speed) {
    var inputYear = d3.select("#year").property("value");
    var inputLevel = d3.select("#collision-type").property("value");

    // filter data by year
    var data = csv.filter(d => d.year == inputYear);

    // filter data by severity level
    var newData = [];
    var rest = level.filter(k => k != inputLevel);
    var wantedKeys = Object.keys(data[0]).filter(k => rest.indexOf(k) == -1);
    console.log(wantedKeys);
    for (i = 0; i < data.length; i++) {
      if (newData[i] == undefined) {
        newData[i] = {};
      }
      Object.keys(data[i]).forEach(key => {
        if (wantedKeys.includes(key)) {
          newData[i][key] = data[i][key];
        }
      });
    }

    // if choose 'all', show all data
    if (inputLevel == "All") {
      newData = data;
    }

    newData.forEach(function(d) {
      d.total = d3.sum(level, k => +d[k]);
      return d;
    });

    y.domain([0, d3.max(newData, d => d3.sum(keys, k => +d[k]))]).nice();

    svg
      .selectAll(".y-axis")
      .transition()
      .duration(speed)
      .call(d3.axisLeft(y).ticks(null, "s"));

    /*
    sort in descending order of total number if checked
    sort in ascending order of month if unchecked
    */
    newData.sort(
      d3.select("#sort").property("checked")
        ? (a, b) => b.total - a.total
        : (a, b) => month.indexOf(a.month) - month.indexOf(b.month)
    );

    x.domain(newData.map(d => d.month));

    svg
      .selectAll(".x-axis")
      .transition()
      .duration(speed)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // if only choose one severity level, get rid of other elements
    var rawStack = d3.stack().keys(keys)(newData);
    var stackData = rawStack.filter(d => !isNaN(d[0][1]));

    var group = svg.selectAll("g.layer").data(stackData, d => d.key);
    console.log(group);

    group.exit().remove();

    group
      .enter()
      .append("g")
      .classed("layer", true)
      .attr("fill", d => colorScale(d.key));

    var bars = svg
      .selectAll("g.layer")
      .selectAll("rect")
      .data(
        d => d,
        e => e.data.month
      );

    bars.exit().remove();

    bars
      .enter()
      .append("rect")
      .attr("width", x.bandwidth())
      .merge(bars)
      .transition()
      .duration(speed)
      .attr("x", d => x(d.data.month))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]));

    svg
      .selectAll("rect")
      .on("mouseover", function(d) {
        var number = d[1] - d[0];
        var xPos = parseFloat(d3.select(this).attr("x"));
        var yPos = parseFloat(d3.select(this).attr("y"));
        var height = parseFloat(d3.select(this).attr("height"));
        var severity = Object.keys(d.data).find(key => d.data[key] == number);
        console.log(severity);

        d3.select(this)
          .attr("stroke", "blue")
          .attr("stroke-width", 0.8);

        svg
          .append("text")
          .attr("x", xPos)
          .attr("y", yPos + height / 2)
          .attr("class", "bar_tooltip")
          .text(severity + ": " + number);
      })
      .on("mouseout", function() {
        svg.select(".bar_tooltip").remove();
        d3.select(this)
          .attr("stroke", "pink")
          .attr("stroke-width", 0.2);
      });

    svg
      .append("text")
      .attr("class", "axis axis--y")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(0," + (30 + height / 2) + "),rotate(-90)")
      .attr("dy", "20.0")
      .text("Number of Records");

    var text = svg.selectAll(".text").data(data, d => d.month);

    text
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("text-anchor", "middle")
      .merge(text)
      .transition()
      .duration(speed)
      .attr("x", d => x(d.month) + x.bandwidth() / 2)
      .attr("y", d => y(d.total) - 5)
      .text(d => d.total);

    var legend = svg
      .selectAll(".legend")
      .data(keys)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      })
      .style("font", "10px sans-serif");

    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", colorScale);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) {
        return d;
      });
  }

  var selectYear = d3.select("#year").on("change", function() {
    update(750);
  });

  var checkbox = d3.select("#sort").on("click", function() {
    update(750);
  });

  var selectSeverity = d3.select("#collision-type").on("change", function() {
    update(650);
  });
}
