// bubble map - https://observablehq.com/@d3/bubble-map
// heat map - https://observablehq.com/@d3/world-choropleth

var world = document.getElementById('worldmap');
var state = document.getElementById('statemap');

var show = function(e){
  chart = {
    const svg = d3.create("svg")
        .style("display", "block")
        .attr("viewBox", [0, 0, width, height]);

    const defs = svg.append("defs");

    defs.append("path")
        .attr("id", "outline")
        .attr("d", path(outline));

    defs.append("clipPath")
        .attr("id", "clip")
      .append("use")
        .attr("xlink:href", new URL("#outline", location));

    const g = svg.append("g")
        .attr("clip-path", `url(${new URL("#clip", location)})`);

    g.append("use")
        .attr("xlink:href", new URL("#outline", location))
        .attr("fill", "white");

    g.append("g")
      .selectAll("path")
      .data(countries.features)
      .join("path")
        .attr("fill", d => color(data.get(d.properties.name)))
        .attr("d", path)
      .append("title")
        .text(d => `${d.properties.name}
  ${data.has(d.properties.name) ? data.get(d.properties.name) : "N/A"}`);

    g.append("path")
        .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

    svg.append("use")
        .attr("xlink:href", new URL("#outline", location))
        .attr("fill", "none")
        .attr("stroke", "black");

    return svg.node();
  }
}

world.addEventListener('click', showworld);
state.addEventListener('click', showstate);
