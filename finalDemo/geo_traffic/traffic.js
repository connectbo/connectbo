// This variable is used to define size of the visualization canvas and the
// margin (or "padding") around the scattter plot.  We use the margin to draw
// things like axis labels.
var height = 800;
var width = 800;
var margin = 60;
// useful funcitons
const unique = (value, index, self) => { //help from: https://medium.com/front-end-weekly/getting-unique-values-in-javascript-arrays-17063080f836
    return self.indexOf(value) === index;
}
function valuetoDate(date_val) {
  return new Date(Math.floor(date_val/12)+2011, date_val%12);
}

// Create the SVG canvas that will be used to render the map
var svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
var g = svg.append('g').attr('class', 'map-layer');

// create SVG for pedestrian/cyclist amenity plot
var plot_svg = d3.select("#bike-plot")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

// define scales for scatter plot
// bike lane rates are all less than 0.1
var x = d3.scaleLinear()
          .domain([0, 0.04])
          .range([margin, width-margin]);
// accident rates are all between 0 and 1400 when all data is included
var y = d3.scaleLinear()
          .domain([0, .025])
          .range([height-margin, margin]);

// create axes for scatter plot
plot_svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,"+(800-margin)+")")
        .call(d3.axisBottom(x));
var plot_bottom_label = plot_svg.append("text")
        .attr("class", "axis-label")
        .attr("y", height-(margin/2 - 10))
        .attr("x", (800/2))
        .style("text-anchor", "middle");
plot_svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate("+(margin)+",0)")
        .call(d3.axisLeft(y));
var plot_left_label = plot_svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("class", "axis-label")
        .attr("y", -5)
        .attr("x", (width/2))
        .style("text-anchor", "middle");

// Timeline Slider & Axis Variables
//TODO: double-ended slider?
var x_sel =d3.select('#x-selection').node();
var y_sel = d3.select('#y-selection').node();
var time_sel = d3.select('#time-selection').node();
var text_update = d3.select('#date-display');
var slider_width = 600;

var monthsliderTime = d3
  .sliderBottom()
  .min(1)
  .max(95)
  .step(1) //step size is by day
  .width(slider_width)
  .default(95)
  .on('onchange', val => {
    updateFilters(val);
  });
var yearsliderTime = d3
  .sliderBottom()
  .min(2011)
  .max(2018)
  .ticks(7)
  .tickFormat(d3.format(''))
  .step(1) //step size is by year
  .width(slider_width)
  .default(2018)
  .on('onchange', val => {
    updateFilters(val);
  });

function updateSlider() {
  if (time_sel.value === "month") {
    d3.select('div#slider-time').html("");
    var gTime = d3
      .select('div#slider-time')
      .append('svg')
      .attr('width', slider_width+200)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');
    gTime.call(monthsliderTime);
    updateFilters(95);
  } else if (time_sel.value === "year") {
    d3.select('div#slider-time').html("");
    var gTime = d3
      .select('div#slider-time')
      .append('svg')
      .attr('width', slider_width+200)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');
    gTime.call(yearsliderTime);
    updateFilters(2018);
  } else { // use all data
    d3.select('div#slider-time').html("");
    updateFilters(95);
  }
}

//Define map elements
// map help from: https://bl.ocks.org/john-guerra/43c7656821069d00dcbc and https://www.d3indepth.com/geographic/
// Projection help from: spatialreference.org/ref/sr-org/110/html/ and https://bl.ocks.org/d3indepth/f7ece0ab9a3df06a8cecd2c0e33e54ef
// and stackoverflow.com/questions/42259132/converting-epsg-projection-bounds-to-a-d3-js/42267008#42267008
var projection = d3.geoConicConformal()
    .rotate([122.25, 0])
    .center([0, 47.655])
    .parallels([49.733, 47.5])
    .scale(170000);
var geoGenerator = d3.geoPath().projection(projection);
var severity_color = d3.scaleOrdinal(d3.schemeCategory10);
var severity_scale = d3.scalePow()
                       .exponent(2)
                       .domain([0, 5])
                       .range([0, 7]);

//Define legend
var details = d3.select("#map").append("div")
                 .attr("class", "accident-details");

var legend = details.append("svg").attr("id", "legend").append("g")
                    .attr("class", "legend")
                    .style("font-size","12px");

var accident_total = d3.select("#map").append("div")
                       .attr("class", "total-text")
                       .html("&nbsp");
legend.append("rect")
      .attr("width", 200)
      .attr("height", 150);
//Fill in legend https://www.d3-graph-gallery.com/graph/custom_legend.html
legend.append("circle").attr("cx",10).attr("cy",15).attr("r", severity_scale(1+1.3)).style("fill", severity_color(1));
legend.append("text").attr("x", 30).attr("y", 15).text("Property Damage Accident").attr("alignment-baseline","middle");
legend.append("circle").attr("cx",10).attr("cy",35).attr("r", severity_scale(2+1.3)).style("fill", severity_color(2));
legend.append("text").attr("x", 30).attr("y", 35).text("Injury Accident").attr("alignment-baseline","middle");
legend.append("circle").attr("cx",10).attr("cy",55).attr("r", severity_scale(3+1.3)).style("fill", severity_color(3));
legend.append("text").attr("x", 30).attr("y", 55).text("Serious Injury Accident").attr("alignment-baseline","middle");
legend.append("circle").attr("cx",10).attr("cy",75).attr("r", severity_scale(4+1.3)).style("fill", severity_color(4));
legend.append("text").attr("x", 30).attr("y", 75).text("Fatal Accident").attr("alignment-baseline","middle");
legend.append("line").attr("class", "sidewalks").attr("x1",10).attr("x2",20).attr("y1",95).attr("y2",95);
legend.append("text").attr("x", 30).attr("y", 95).text("Sidewalk").attr("alignment-baseline","middle");
legend.append("line").attr("class", "bike-lanes").attr("x1",10).attr("x2",20).attr("y1",115).attr("y2",115);
legend.append("text").attr("x", 30).attr("y", 115).text("Bike Lane").attr("alignment-baseline","middle");

var maptooltip = d3.select("#map").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
var tooltip = d3.select("#bike-plot").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

var accidenttip = details.append("div")
                .attr("class", "accident-tooltip")
                .style("opacity", 0);
accidenttip.html("&nbsp</br>&nbsp</br>&nbsp</br>&nbsp");

// tooltip mouseover event handler
var scatterTipMouseover = function(d) {
  var new_amenity_rate = d.amenity_rate;
  if (d.amenity_rate < 1) {
    new_amenity_rate = d.amenity_rate.toPrecision(4)
  }
  var html  = d.census_area + "<br/>" +
                            "geoID: " + d.geoid + "<br/>" +
                            "x-value: " + d.accident_rate.toPrecision(4) + "<br/>" +
                            "y-value: " + new_amenity_rate;

    tooltip.html(html)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
          .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!

  };
var areaTipMouseover = function(d) {

  var html  = d.properties.NAMELSAD10 + "<br/>" + "geoID: " + d.properties.GEOID10;

    maptooltip.html(html)
              .style("left", (d3.event.pageX + 15) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
            .transition()
              .duration(200) // ms
              .style("opacity", .9) // started as 0!

};
var accidentTipMouseover = function(d) {

    var html  = "<b>Report Number:</b> " + d.properties.REPORTNO + "</br>" +
                "<b>Accident date:</b> " + d.properties.INCDTTM + " | <b>Severity:</b> " + d.properties.SEVERITYDESC + "</br>" +
                "<b>Vehicles involved:</b> " + d.properties.VEHCOUNT + " | <b>People involved:</b> " + d.properties.PERSONCOUNT + " | <b>Pedestrians involved:</b> " + d.properties.PEDCOUNT + "</br>" +
                "<b>Cyclists involved:</b> " + d.properties.PEDCYLCOUNT+ " | <b>Weather:</b> " + d.properties.WEATHER + "</br>" +
                "<b>Road Condition:</b> " + d.properties.ROADCOND + " | <b>Light Condition:</b> " + d.properties.LIGHTCOND;

    accidenttip.html(html)
              .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!

};

 // tooltip mouseout event handler
var tipMouseout = function(d) {
        tooltip.transition()
              .duration(300) // ms
              .style("opacity", 0); // don't care about position!
  };
var areatipMouseout = function(d) {
          maptooltip.transition()
                .duration(300) // ms
                .style("opacity", 0); // don't care about position!
};
var accidentTipMouseout = function(d) {
          accidenttip.transition()
                .duration(300) // ms
                .style("opacity", 0); // don't care about position!
};


//draw an outline of seattle
function drawGeoJson(data_file, options) {
  var outline_data = d3.json(data_file, function(error, data) {
    var mapLayer = g.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('class', options.class_name)
            .attr('d', geoGenerator);
  });
}
drawGeoJson("seattleoutline.geojson", {class_name: 'outline'});

// create map svg
var outline = svg.append('g').attr('class', 'dynamic-map');
var details_svg = d3.select("#map")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);
var census_details = details_svg.append('g').attr('class', 'census_details');

// draw points
function renderPoints(data_subset, detailed_projection) {
  accident_total.html("<b>Total number of accidents: </b>" + data_subset.length + "</br>" +
                        "Hover over the points on the map for details about each accident." + "</br>" +
                        "<b>Note: </b>not all accident points may be easily visible due to very similar latitudes and longitudes."+
                        "</br>" + "See the console for a more detailed view of the raw data.");
  var drawn_accidents = census_details.selectAll('circle')
            .data(data_subset, function(d) {return d.properties.OBJECTID;});
  drawn_accidents.exit()
                .remove();

  drawn_accidents.enter()
                  .append('circle')
                  .attr('class', 'accidents')
                  .attr('cx', function(d) {
                    console.log(d.properties); // not all accidents visible on details plot becuase lat/longs are so close together
                    // This way users can see the raw data for the accidents in the area they selected.
                    return detailed_projection(d.geometry.coordinates)[0]; }) //function(d) { return d3.geoPath().pointRadius(parseInt(d.properties.SEVERITYCODE)+1.5).projection(projection)} //return
                  .attr('cy', function(d) { return detailed_projection(d.geometry.coordinates)[1]; })
                  .attr('r', function(d) { return severity_scale(parseInt(d.properties.SEVERITYCODE)+1.3); })
                  .style('fill', function(d) { return severity_color(parseInt(d.properties.SEVERITYCODE));})
                  .on("mouseover", accidentTipMouseover)
                  .on("mouseout", accidentTipMouseout);
}

// Update the filters for the dashbaord
var dashboard_filters = {};
function updateFilters(date_val, time_unit) {
  // clear census details
  d3.select("g.census_details").selectAll("*").remove();
  accident_total.html("&nbsp");
  // reset map highlighting (only view one census area at a time)
  d3.selectAll(".census_area").style('stroke-width', 0.5).style('stroke', '#aaa');
  d3.selectAll(".plot-points").style('r', 3).style('fill', "red");

  //var default_date = (dashboard_filters === undefined) ? 95 : dashboard_filters.end_date;
  dashboard_filters['time_unit'] = time_sel.value;
  dashboard_filters['end_date'] = date_val || dashboard_filters.end_date || 95;
  dashboard_filters['severity_level'] = document.getElementById('severity').value;
  dashboard_filters['plot_type'] = x_sel.value;
  dashboard_filters['y_variable'] = y_sel.value;
  dashboard_filters['light'] = document.getElementById('light').value;
  dashboard_filters['weather'] = document.getElementById('weather').value;
  dashboard_filters['bike'] = document.getElementById('bike-filter').value;
  renderBikePlot(dashboard_filters);
}
// reference about date objects in javascript: http://adripofjavascript.com/blog/drips/checking-date-equality-in-javascript.html
// need to compare object.getTime() not objects themselves (ex. new Date(d.INCDTTM). getTIME() > start_date.getTime())
// draw/update the ped plot
function renderBikePlot(input_filters) {
  var collisions_subset = collisions.features;

  //filter out accidents with no location
  collisions_subset = collisions_subset.filter(function(d) {return d.geometry != null; })
  // implement date filter
  var max_date = new Date(2019, 0); // inputting only a year and a month results in the first of the year
  // therefore for the maximum date input the next month or january of the next year
  var true_date = valuetoDate(input_filters.end_date);
  if (input_filters.time_unit === "month") {
    var month_val = true_date.getMonth();
    var year_val = true_date.getYear() + 1900;
    if (month_val === 11) {
      month_val = -1;
      year_val = year_val + 1;
    }
    max_date = new Date(year_val, month_val+1)
  } else if (input_filters.time_unit === "year") {
    max_date = new Date(input_filters.end_date + 1, 0);
  }

  console.log(collisions_subset.length);
  if (input_filters.severity_level == "-1") input_filters.severity_level = ["0", "1", "2", "3", "4"];
  if (input_filters.time_unit != "all") {
    collisions_subset = collisions_subset.filter(function(d) {
      var accident_date = new Date(d.properties.INCDTTM)
      if (input_filters.time_unit === "month") {
        return (accident_date.getMonth() == true_date.getMonth()) && (accident_date.getYear() == true_date.getYear());
      } else if (input_filters.time_unit === "year") {
        return accident_date.getYear()+1900 == input_filters.end_date;
      }
    });
  }

  collisions_subset = collisions_subset.filter(function(d) { return input_filters.severity_level.includes(d.properties.SEVERITYCODE); })
  if (input_filters.light == "other") input_filters.light = ["Unknown", null, "Other"];
  if (input_filters.weather == "other") input_filters.weather = ["Unknown", null, "Other"];
  if (input_filters.light != "all") {
    collisions_subset = collisions_subset.filter(function(d) { return input_filters.light.includes(d.properties.LIGHTCOND); })
  }
  if (input_filters.weather != "all") {
    collisions_subset = collisions_subset.filter(function(d) { return input_filters.weather.includes(d.properties.WEATHER); })
  }
  if (input_filters.bike != "all") {
    if (input_filters.bike === "pedestrians") {
      collisions_subset = collisions_subset.filter(function(d) { return d.properties.PEDCOUNT > 0; })
    } else if (input_filters.bike === "cyclists") {
      collisions_subset = collisions_subset.filter(function(d) { return d.properties.PEDCYLCOUNT > 0; })
    } else {
      collisions_subset = collisions_subset.filter(function(d) { return (d.properties.PEDCYLCOUNT + d.properties.PEDCOUNT) > 0; })
    }
  }
  console.log(collisions_subset.length);
  // update text field
  var year = 2018;
  if (input_filters.time_unit === "all") {
    text_update.text("All accident data from 2011 to 2018")
  } else {
    if (input_filters.time_unit == "month") {
      year = true_date.getYear()+1900;
      text_update.text("Accident and " + input_filters.plot_type + " data for " + months[true_date.getMonth()+1] + ' '+ year + '.');
    } else if (input_filters.time_unit == "year") {
      year = input_filters.end_date;
      text_update.text("Accident and " + input_filters.plot_type + " data for " + year + '.');
    }

  }

  //update x axis
  if (input_filters.plot_type === "bike") {
    plot_bottom_label.text("Meters of Bike Lanes per Census Tract Area (meters/square meters)");
    var axis_subset = bikes.features.filter(function(d) { return (new Date(d.properties.DATE_COMPLETED) < max_date);}); // less than now since pushed to following month
  } else if (input_filters.plot_type == "sidewalk") {
    plot_bottom_label.text("Meters of Sidewalks per Census Tract Area (meters/square meters)");
    var axis_subset = sidewalks.features.filter(function(d) {return (new Date(d.properties.ADDDTTM) < max_date);});
  } else { // mhi
    plot_bottom_label.text("Median Household Income ($)");
  }
  // update y axis
  if (input_filters.y_variable === "accident-rate") {
    plot_left_label.text("Census area accident rate (# collisions/total population)");
  } else if (input_filters.y_variable == "avg-severity") {
    plot_left_label.text("Census area average accident severity rate (accident severity level/# accidents)");
  } else if (input_filters.y_variable == "injuries") {
    plot_left_label.text("Census area injury rate (# injuries/total populaiton)");
  } else if (input_filters.y_variable == "deaths") {
    plot_left_label.text("Census area death rate (# deaths/total populaiton)");
  } else {
    plot_left_label.text("Census area injury/death rate (# injuries + # deaths/total populaiton)");
  }

  // group the subset of data by census tract
  // calculate the accident rate (i.e. number of accidents in the region normalized by the population) AND the bike lane rate (i.e. length of bike lanes normalized by area of census tract)
  var unique_tracts = collisions_subset.map(function(d) { return d.properties.census_tract; }).filter(unique);
  var grouped_data = [];
  var total_accidents = 0;
//["B19013_001E (MHI)","B01003_001E (POPULATION)","NAME","state","county","tract","geoid", year] <-- to reference for census data indices
  unique_tracts.map(function(t) { // for each census region
    var tract_collisions = collisions_subset.filter(function(d) { return d.properties.census_tract == t; });
    var census_data = census.filter(function(d) {return d[6] == t; })
    var census_year = year;
    if (census_year > 2017) { // 2017 is most recent census data
      census_year = 2017;
    }
    census_data = census_data.filter(function(d) {return d[7] == census_year});
    var severity_ratings = tract_collisions.map(function(d) {return parseInt(d.properties.SEVERITYCODE)});
    var injuries = tract_collisions.map(function(d) {return d.properties.INJURIES});
    var deaths = tract_collisions.map(function(d) {return d.properties.FATALITIES});
    var total_pop = parseFloat(census_data[0][1]);
    var num_months = input_filters.end_date+1;
    var accident_rate = 0;
    var amenity_rate = 0;
    // y - axis
    if (input_filters.y_variable === "accident-rate") {
      accident_rate = tract_collisions.length/total_pop;
    } else if (input_filters.y_variable == "avg-severity") {
      accident_rate = ss.mean(severity_ratings);
    } else if (input_filters.y_variable == "injuries") {
      accident_rate = ss.sum(injuries)/total_pop;
    } else if (input_filters.y_variable == "deaths") {
      accident_rate = ss.sum(deaths)/total_pop;
    } else {
      accident_rate = ss.sum(injuries) + ss.sum(deaths);
      accident_rate = accident_rate/total_pop;
    }
    // x - axis
    if (input_filters.plot_type === "mhi") {
      amenity_rate = parseInt(census_data[0][0]);
    } else {
      var tract_bikes = axis_subset.filter(function(d) { return d.properties.census_tract == t; });
      var census_area = census_areas.features.filter(function(d) {return d.properties.GEOID10 == t; });
      tract_bikes.map(function(d){ amenity_rate += d.properties.length_met;});
      amenity_rate = amenity_rate/census_area[0].properties.area_meter;
    }

    // TODO: since changes are subtle, might want to add other indication (i.e. green if accident rate went down, red if it went up)
    grouped_data.push({"geoid":t, "accident_rate":accident_rate, "amenity_rate":amenity_rate, "census_area": census_data[0][2]});
    total_accidents += tract_collisions.length;
  })

  // rescale axes; help from: http://bl.ocks.org/phoebebright/3098488
  y.domain([ss.min(grouped_data.map(function(d) { return d.accident_rate})), ss.max(grouped_data.map(function(d) { return d.accident_rate}))]);
  x.domain([ss.min(grouped_data.map(function(d) { return d.amenity_rate})), ss.max(grouped_data.map(function(d) { return d.amenity_rate}))]);

  plot_svg.select(".x-axis")
          .transition().duration(1000)
          .call(d3.axisBottom(x));
  plot_svg.select(".y-axis")
          .transition().duration(1000)
          .call(d3.axisLeft(y));

  // render the scatter plot
  var circles = plot_svg.selectAll("circle").data(grouped_data, function(d) {return d.geoid; });

  circles.exit().transition().duration(300).attr("r", 0).remove();
  circles.enter().append("circle")
          .attr("r", 3)
          .attr("class", "plot-points")
          .attr("id", function(d) { return "point-" + d.geoid})
          .attr("cx", function(d) { return x(d.amenity_rate); })
          .attr("cy", function(d) { return y(d.accident_rate); })
          .style("fill", "red")
          .on("mouseover", scatterTipMouseover)
          .on("mouseout", tipMouseout)
          .on("click", function(d) { return censusAreaDetails(d, "plot")});

  // update point location
  circles.transition()
         .duration(500)
         .attr("cx", function(d) { return x(d.amenity_rate); })
         .attr("cy", function(d) { return y(d.accident_rate); });

  renderCensusAreas(input_filters, grouped_data);
}

function filter_hash_value(hash, geoID, key_value) {
  var data_value = null;
  hash.map(function(d) {
    if (d.geoid === geoID) {
      data_value = d[key_value];
    }
  });
  return data_value;
}

function renderCensusAreas(filters, plot_data) {
  var amenity_rates = plot_data.map(function(d) { return d. accident_rate; });

  var mapColor = d3.scale.linear()
  .domain([ss.min(amenity_rates), ss.max(amenity_rates)])
  .range(["white", "red"]);

  // add our update census areas
  var mapLayer = outline.selectAll('path').data(census_areas.features, function(d) {return d.properties.OBJECTID});

  mapLayer.enter()
          .append('path')
          .attr('class', 'census_area')
          .attr('id', function(d) {return d.properties.GEOID10})
          .attr('d', geoGenerator)
          .style('fill', function(d) { return mapColor(filter_hash_value(plot_data, d.properties.GEOID10, "accident_rate")); } )
          .style('stroke-width', 0.5)
          .on("mouseover", areaTipMouseover)
          .on("mouseout", areatipMouseout)
          .on('click', function(d) {return censusAreaDetails(d, "map") });

  // update colors
  mapLayer.style('fill', "white")
         .transition()
         .duration(500)
         .style('fill', function(d) { return mapColor(filter_hash_value(plot_data, d.properties.GEOID10, "accident_rate")); } );
}

// help from: http://bl.ocks.org/williaster/af5b855651ffe29bdca1
function censusAreaDetails(item, type){

  // reset map and plot highlighting (only view one census area at a time)
  d3.selectAll(".census_area").style('stroke-width', 0.5).style('stroke', '#aaa');
  d3.selectAll(".plot-points").style('r', 3).style('fill', "red");

  if (type === "plot") {
    // find census area with matching geoID
    var detailed_area = census_areas.features.filter(function(t) { return t.properties.GEOID10 === item.geoid});
  } else {
    var detailed_area = census_areas.features.filter(function(t) { return t.properties.GEOID10 === item.properties.GEOID10});
  }

  // highlight census area on the map
  var mapItem = document.getElementById(detailed_area[0].properties.GEOID10);
  mapItem.style['stroke-width'] = 4;
  mapItem.style['stroke'] = "black";

  // highlight census area on the plot
  var plotItem = document.getElementById('point-'+detailed_area[0].properties.GEOID10);
  if (plotItem != null) {
    plotItem.style['r'] = 7;
    plotItem.style['fill'] = "blue";
  }

  // center new projection on center of census_area
  var center_coords = centers.features.filter(function(d) {return d.properties.GEOID10 === detailed_area[0].properties.GEOID10})[0].geometry.coordinates;

  var details_projection = d3.geoConicConformal()
      .rotate([-(center_coords[0] + 0.03), 0])
      .center([0, center_coords[1] + 0.005])
      .scale(670000);
  var details_geoGenerator = d3.geoPath().projection(details_projection);

  // plot the census area
  var polygon = census_details.selectAll("path").data(detailed_area, function(d) {return d.properties.GEOID10;} );

  polygon.exit().remove();
  polygon.enter()
         .append('path')
         .attr('class', 'census_details_area')
         .attr('d', details_geoGenerator)
         .style('fill', '#ddd')
         .style('stroke', '#aaa');

   // find accidents within the census area based on the current set of filters
   var collisions_subset = collisions.features;
   //filter out accidents with no location
   collisions_subset = collisions_subset.filter(function(d) {return d.geometry != null; })
   // implement date filter
   var max_date = new Date(2019, 0); // inputting only a year and a month results in the first of the year
   // therefore for the maximum date input the next month or january of the next year
   var true_date = valuetoDate(dashboard_filters.end_date);
   if (dashboard_filters.time_unit === "month") {
     var month_val = true_date.getMonth();
     var year_val = true_date.getYear() + 1900;
     if (month_val === 11) {
       month_val = -1;
       year_val = year_val + 1;
     }
     max_date = new Date(year_val, month_val+1)
   } else if (dashboard_filters.time_unit === "year") {
     max_date = new Date(dashboard_filters.end_date + 1, 0);
   }

   if (dashboard_filters.severity_level == "-1") dashboard_filters.severity_level = ["0", "1", "2", "3", "4"];
   if (dashboard_filters.time_unit != "all") {
     collisions_subset = collisions_subset.filter(function(d) {
       var accident_date = new Date(d.properties.INCDTTM)
       if (dashboard_filters.time_unit === "month") {
         return (accident_date.getMonth() == true_date.getMonth()) && (accident_date.getYear() == true_date.getYear());
       } else if (dashboard_filters.time_unit === "year") {
         return accident_date.getYear()+1900 == dashboard_filters.end_date;
       }
     });
   }
   collisions_subset = collisions_subset.filter(function(d) { return dashboard_filters.severity_level.includes(d.properties.SEVERITYCODE); })
   collisions_subset = collisions_subset.filter(function(d) { return d.properties.census_tract === detailed_area[0].properties.GEOID10; });
   if (dashboard_filters.light == "other") dashboard_filters.light = ["Unknown", null, "Other"];
   if (dashboard_filters.weather == "other") dashboard_filters.weather = ["Unknown", null, "Other"];
   if (dashboard_filters.light != "all") {
     collisions_subset = collisions_subset.filter(function(d) { return dashboard_filters.light.includes(d.properties.LIGHTCOND); })
   }
   if (dashboard_filters.weather != "all") {
     collisions_subset = collisions_subset.filter(function(d) { return dashboard_filters.weather.includes(d.properties.WEATHER); })
   }
   if (dashboard_filters.bike != "all") {
     if (dashboard_filters.bike === "pedestrians") {
       collisions_subset = collisions_subset.filter(function(d) { return d.properties.PEDCOUNT > 0; })
     } else if (dashboard_filters.bike === "cyclists") {
       collisions_subset = collisions_subset.filter(function(d) { return d.properties.PEDCYLCOUNT > 0; })
     } else {
       collisions_subset = collisions_subset.filter(function(d) { return (d.properties.PEDCYLCOUNT + d.properties.PEDCOUNT) > 0; })
     }
   }
   // plot the points on the details plot
   renderPoints(collisions_subset, details_projection);

   var bikelane_set = filterAmenities(bikes.features, detailed_area[0].properties.GEOID10, max_date, "DATE_COMPLETED");
   var sidewalk_set = filterAmenities(sidewalks.features, detailed_area[0].properties.GEOID10, max_date, "ADDDTTM");

   // plot sidewalks or bikelanes for this census areas
   if (dashboard_filters["plot_type"] == "bike") {
     drawAmenities(bikelane_set, 'bike-lanes', details_geoGenerator);
   } else if (dashboard_filters["plot_type"] == "sidewalk") {
     drawAmenities(sidewalk_set, 'sidewalks', details_geoGenerator);
   } else { // plot both
     drawAmenities(bikelane_set, 'bike-lanes', details_geoGenerator);
     drawAmenities(sidewalk_set, 'sidewalks', details_geoGenerator);
   }
}

function filterAmenities(features, geoid, max_date, date_field) {
  var features_subset = features.filter(function(d) { return d.properties.census_tract === geoid; });
  return features_subset.filter(function(d) { return (new Date(d.properties[date_field]) < max_date);});
}

function drawAmenities(data, amenity_class, generator) {
  var drawn_amenities = census_details.selectAll('path.'+ amenity_class)
            .data(data, function(d) {return d.properties.OBJECTID;});

  drawn_amenities.exit()
                .remove();

  drawn_amenities.enter()
                  .append('path')
                  .attr('class', amenity_class)
                  .attr('d', generator);
}

// set default start and end_date to include all data
updateFilters(95);
