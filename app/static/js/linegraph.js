// line graph - https://observablehq.com/@d3/line-chart

var graph = document.getElementById('showgraph');
// console.log(graphdata)
var i;
for (i = 0; i < graphdata.length; i++){
  graphdata[i]['date'] = new Date(graphdata[i]['date']);
  // console.log(graphdata[i]['date'])
};

var svg;

var display = function(e){

  var data = graphdata.map(({date, confirmed, deaths, recovered}) => ({date, value: confirmed}));
  // // var data = Object.assign((d3.csvParse
  // //   (await FileAttachment("us-states.csv").text(), d3.autoType))
  // //   .map(({date, close}) => ({date, value: close})), {y: "$ Close"})
  console.log(data)

  var margin = {top: 50, right: 50, bottom: 50, left: 100}
    , width = window.innerWidth - margin.left - margin.right-20 // Use the window's width
    , height = window.innerHeight - margin.top - margin.bottom - 150; // Use the window's height - int to accomodate header


  svg = d3.select("#linegraph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

  // var xAxis = g => g
  //     .attr("transform", `translate(0,${height - margin.bottom})`)
  //     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

  // var yAxis = g => g
  //     .attr("transform", `translate(${margin.left},0)`)
  //     .call(d3.axisLeft(y))
  //     .call(g => g.select(".domain").remove())
  //     .call(g => g.select(".tick:last-of-type text").clone()
  //         .attr("x", 3)
  //         .attr("text-anchor", "start")
  //         .attr("font-weight", "bold")
  //         .text(data.y));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y));

  var line = d3.line()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date))
      .y(d => y(d.value));

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return x(d.date) })
      .attr("cy", function(d) { return y(d.value) })
      .attr("r", 1);
  // console.log(d)


}

graph.addEventListener('click', display);
