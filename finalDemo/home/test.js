// reference from https://www.d3-graph-gallery.com/graph/heatmap_style.html
const margin = { top: 20, right: 20, bottom: 20, left: 50 },
  width = 650 - margin.left - margin.right,
  height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#heatmap")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + ")");

//create a tooltip
const tooltip = d3
  .select(".viz-row")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("position", "absolute")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// Build color scale
function buildColorScale(data, col_type) {
  let count;
  if (col_type == "All") {
    count = d3.map(data, d => d.sum).keys();
  } else if (col_type == "Property Damage") {
    count = d3.map(data, d => d.Property_Damage).keys();
  } else if (col_type == "Injury") {
    count = d3.map(data, d => d.Injury).keys();
  } else if (col_type == "Serious Injury") {
    count = d3.map(data, d => d.Serious_Injury).keys();
  } else {
    count = d3.map(data, d => d.Fatality).keys();
  }
  count = count.map(d => parseInt(d));
  let min = d3.min(count);
  let max = d3.max(count);
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([max, min]);
  return colorScale;
}

// return count based on collision severity type
const type_num = function(d, col_type) {
  if (col_type == "All") {
    return d.sum;
  } else if (col_type == "Property Damage") {
    return d.Property_Damage;
  } else if (col_type == "Injury") {
    return d.Injury;
  } else if (col_type == "Serious Injury") {
    return d.Serious_Injury;
  } else {
    return d.Fatality;
  }
};

function renderViz(time, col_type) {
  svg.selectAll("*").remove();
  const data = time == "month" ? monthData : weekData;
  let xAxis = d3.map(data, d => d.x).keys();
  let yAxis = d3.map(data, d => d.y).keys();

  //build x,y scale and axis
  let x = d3
    .scaleBand()
    .range([0, width])
    .domain(xAxis)
    .padding(0.05);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .style("font-size", "1.05em")
    .select(".domain")
    .remove();

  //build y scale and axis
  let y = d3
    .scaleBand()
    .range([0, height])
    .domain(yAxis)
    .padding(0.05);

  svg
    .append("g")
    .call(d3.axisLeft(y).tickSize(0))
    .style("font-size", "1.05em")
    .select(".domain")
    .remove();

  const color = buildColorScale(data, col_type);

  const mouseover = function(d) {
    tooltip.style("opacity", 1);
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1);
  };

  const mouseleave = function(d) {
    tooltip.style("opacity", 0);
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8);
  };

  const mousemove = function(d) {
    tooltip
      .html("The number of accidents " + type_num(d, col_type))
      .style("left", d3.mouse(this)[0] + 70 + "px")
      .style("top", d3.mouse(this)[1] + 250 + "px");
  };

  svg
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return x(d.x);
    })
    .attr("y", function(d) {
      return y(d.y);
    })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("class", "heat")
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .attr("width", 0)
    .attr("height", 0)
    .transition()
    .duration(800)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function(d) {
      return color(type_num(d, col_type));
    });
}

$("#time").change(function() {
  const collision = $("#collision-type").val();
  const time = $("#time").val();
  renderViz(time, collision);
});

$("#collision-type").change(function() {
  const col_type = this.value;
  const data = $("#time").val() == "month" ? monthData : weekData;
  const color = buildColorScale(data, this.value);
  svg
    .selectAll(".heat")
    .data(data)
    .on("mousemove", function(d) {
      tooltip
        .html("The number of accidents " + type_num(d, col_type))
        .style("left", d3.mouse(this)[0] + 70 + "px")
        .style("top", d3.mouse(this)[1] + 120 + "px");
    })
    .transition()
    .duration(650)
    .style("fill", function(d) {
      return color(type_num(d, col_type));
    });
});

renderViz($("#time").val(), $("#collision-type").val());
