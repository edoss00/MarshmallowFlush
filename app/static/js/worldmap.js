<<<<<<< HEAD:app/static/js/maps.js
// bubble map - https://observablehq.com/@d3/bubble-map
// heat map - https://observablehq.com/@d3/world-choropleth

// var world = document.getElementById('worldmap');
// var state = document.getElementById('state');


// console.log(stategraphdata)
// console.log([...data.values()])
// console.log(data)

// function zoomed() {
//   const {transform} = d3.event;
//   g.attr("transform", transform);
//   g.attr("stroke-width", 1 / transform.k);
// }
//
// const zoom = d3.zoom()
//     .scaleExtent([1, 8])
//     .on("zoom", zoomed);
//
// function clicked(d) {
//   const [[x0, y0], [x1, y1]] = path.bounds(d);
//   d3.event.stopPropagation();
//   svg.transition().duration(750).call(
//     zoom.transform,
//     d3.zoomIdentity
//       .translate(width / 2, height / 2)
//       .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
//       .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
//     d3.mouse(svg.node())
//   );
// }
//
// function reset() {
//   svg.transition().duration(750).call(
//     zoom.transform,
//     d3.zoomIdentity,
//     d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
//   );
// }

///////////// STATE MAP ///////////////////////
var data = new Map(stategraphdata.slice(1).map(([date, county, state, fips, deaths, recovered]) => [fips, +deaths]))

var radius = d3.scaleSqrt()
    .domain([0, d3.max([...data.values()])])
    .range([0,50])
// console.log(d3.max([...data.values()]))
// [0, d3.quantile([...data.values()].sort(d3.ascending), 0.985)], [0, 15]
// console.log(radius)
var path = d3.geoPath()
var format = d3.format(",.0f")
// console.log(us)

var svg = d3.select("#statemap").append("svg")
    .attr("viewBox", [-50, -50, 1100, 750])
    // .on("click", reset);

svg.append("path")
    .datum(topojson.feature(us, us.objects.nation))
    .attr("fill", "#ccc")
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
    // .attr("cursor", "pointer")
  .selectAll("circle")
  .data(topojson.feature(us, us.objects.counties).features
      .map(d => (d.value = data.get(d.id), d))
      .sort((a, b) => b.value - a.value))
  .join("circle")
    // .on("click", clicked)
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("r", d => radius(d.value))
  .append("title")
    .text(d => `${d.properties.name}
  ${format(d.value)}`);

// svg.call(zoom);

=======
>>>>>>> 6d0756175d11a4ffee4e8ce0f6b9724da12c0ca7:app/static/js/worldmap.js
///////////// WORLD MAP ///////////////////////
// console.log(worldgraphdata)
rename = new Map([
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Burma", "Myanmar"],
  ["Central African Republic", "Central African Rep."],
  ["Congo (Brazzaville)","Congo"],
  ["Congo (Kinshasa)", "Dem. Rep. Congo"],
  ["Cote d'Ivoire","Côte d'Ivoire"],
  ["Dominican Republic", "Dominican Rep."],
  ["Equatorial Guinea", "Eq. Guinea"],
  ["Korea, South", "South Korea"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["Saint Vincent and the Grenadines", "St. Vin. and Gren."],
  ["Sao Tome and Principe", "São Tomé and Principe"],
  ["South Sudan", "S. Sudan"],
  ["Taiwan*","Taiwan"],
  ["Eswatini", "eSwatini"],
  ["North Macedonia", "Macedonia"],
  // ["Tuvalu", ?],
  ["US", "United States of America"],
  ["Western Sahara", "W. Sahara"]
])

data2 = new Object(new Map(worldgraphdata.map(({country, deaths}) => [rename.get(country) || country, +deaths])), {title: "New Deaths"})
console.log(data2)

var svg2 = d3.select("#worldmap").append("svg")
      .style("display", "block")
      .attr("viewBox", [-50, -50, 1100, 750]);

var defs = svg2.append("defs");

var color = d3.scaleSequentialSqrt()
    .domain(d3.extent(Array.from(data2.values())))
    // .range(["#ffffe5","fee391","#662506"])
    .interpolator(d3.interpolateReds)
    .unknown("#ccc");
// console.log(data2.keys())

var projection = d3.geoEqualEarth()
var path2 = d3.geoPath(projection)
var outline = ({type: "Sphere"})
var countries = topojson.feature(world, world.objects.countries)

defs.append("path")
    .attr("id", "outline")
    .attr("d", path2(outline));

defs.append("clipPath")
    .attr("id", "clip")
  .append("use")
    .attr("xlink:href", new URL("#outline", location));

var g = svg2.append("g")
    .attr("clip-path", `url(${new URL("#clip", location)})`);

g.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("fill", "#EAE7DC");

g.append("g")
  .selectAll("path")
  .data(countries.features)
  .join("path")
    .attr("fill", d => color(data2.get(d.properties.name)))
    .attr("d", path2)
  .append("title")
    .text(d => `${d.properties.name}
${data2.has(d.properties.name) ? data2.get(d.properties.name) : "N/A"}`);

g.append("path")
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-linejoin", "round")
    .attr("d", path2);

svg2.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("fill", "none")
    .attr("stroke", "black");

// world.addEventListener('click', showworld);
// state.addEventListener('click', showstate);
