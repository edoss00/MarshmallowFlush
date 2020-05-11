// bubble map - https://observablehq.com/@d3/bubble-map

// var world = document.getElementById('worldmap');
// var state = document.getElementById('state');


// console.log(stategraphdata)
var data = new Map(stategraphdata.slice(1).map(([date, county, state, fips, deaths, recovered]) => [fips, +deaths]))
// console.log([...data.values()])
// console.log(data)

///////////// STATE MAP ///////////////////////
var radius = d3.scaleSqrt()
    .domain([0, d3.max([...data.values()])])
    .range([0,50])
// console.log(d3.max([...data.values()]))
// [0, d3.quantile([...data.values()].sort(d3.ascending), 0.985)], [0, 15]
console.log(radius)
var path = d3.geoPath()
var format = d3.format(",.0f")
// console.log(us)

var svg = d3.select("#statemap").append("svg")
    .attr("viewBox", [-50, -50, 1100, 750]);

svg.append("path")
    .datum(topojson.feature(us, us.objects.nation))
    .attr("fill", "gray")
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("class", "pathBorder")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

var legend = svg.append("g")
    .attr("fill", "#777")
    .attr("transform", "translate(925,608)")
    .attr("text-anchor", "middle")
    .style("font", "10px sans-serif")
  .selectAll("g")
    .data([1e4, 5e4, 1e5])
  .join("g");

legend.append("circle")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("cy", d => -radius(d))
    .attr("r", radius);

legend.append("text")
    .attr("y", d => -2 * radius(d))
    .attr("dy", "1.3em")
    .text(d3.format(".1s"));

svg.append("g")
    .attr("fill", "brown")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
  .selectAll("circle")
  .data(topojson.feature(us, us.objects.counties).features
      .map(d => (d.value = data.get(d.id), d))
      .sort((a, b) => b.value - a.value))
  .join("circle")
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("r", d => radius(d.value))
  .append("title")
    .text(d => `${d.properties.name}
  ${format(d.value)}`);
