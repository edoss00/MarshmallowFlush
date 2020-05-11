// heat map - https://observablehq.com/@d3/world-choropleth

function legend({
  color,
  title,
  tickSize = 6,
  width = 400,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 20,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) {

  const svg2 = d3.select("#worldmap").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let x;

  x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});

  svg2.append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

  svg2.append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold"));

}

function ramp(color, n = 256) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext("2d");
  d3.select(canvas).attr("width", n)
    .attr("height", 1);
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
  return canvas;
}

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

legend({
  color: d3.scaleSequentialSqrt(d3.extent(Array.from(data2.values())), d3.interpolateReds),
  title: "New Deaths)"
})

var svg = d3.select("#worldmap").append("svg")
      .style("display", "block")
      .attr("viewBox", [-50, -10, 1100, 580]);

var defs = svg.append("defs");

var color = d3.scaleSequentialSqrt()
    .domain(d3.extent(Array.from(data2.values())))
    // .range(["#ffffe5","fee391","#662506"])
    .interpolator(d3.interpolateReds)
    .unknown("#ccc");
// console.log(data2.keys())

var projection = d3.geoEqualEarth()
var path = d3.geoPath(projection)
var outline = ({type: "Sphere"})
var countries = topojson.feature(world, world.objects.countries)

defs.append("path")
    .attr("id", "outline")
    .attr("d", path(outline));

defs.append("clipPath")
    .attr("id", "clip")
  .append("use")
    .attr("xlink:href", new URL("#outline", location));

var g = svg.append("g")
    .attr("clip-path", `url(${new URL("#clip", location)})`);

g.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("fill", "#EAE7DC");

g.append("g")
  .selectAll("path")
  .data(countries.features)
  .join("path")
    .attr("fill", d => color(data2.get(d.properties.name)))
    .attr("d", path)
  .append("title")
    .text(d => `${d.properties.name}
${data2.has(d.properties.name) ? data2.get(d.properties.name) : "N/A"}`);

g.append("path")
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

svg.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("fill", "none")
    .attr("stroke", "black");

// world.addEventListener('click', showworld);
// state.addEventListener('click', showstate);
