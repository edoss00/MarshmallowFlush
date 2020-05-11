// heat map - https://observablehq.com/@d3/world-choropleth
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
