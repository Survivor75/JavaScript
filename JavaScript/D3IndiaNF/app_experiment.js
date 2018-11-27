var width = window.innerWidth, height = window.innerHeight;

var projection = d3.geo.mercator();

var index = 0;
var path = d3.geo.path()
          .projection(projection)
          .pointRadius(2),
          force = d3.layout.force().size([width, height]);

var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);

var g = svg.append("g");

g.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", particle);


d3.json("india_.json", function(error, data){

  var boundary = centerZoom(data);
  var subunits = drawSubUnits(data);
  colorSubunits(subunits);
  drawSubUnitLabels(data);
  drawPlaces(data);
  drawOuterBoundary(data, boundary);
  drawForceDirected(data, subunits, boundary);

});

function infoHTML(state_name) {
    return "<h5>" + state_name + "</h5>" + "<h5>" + "NowFloats" + "</h5>";
}

function hoverOver(state_name) {

    d3.select("#info").transition().duration(250).style("opacity", .7);
    d3.select("#info").html(infoHTML(state_name))
      .style("left", (d3.event.layerX) + "px")
      .style("top", (d3.event.layerY) + "px");
}

function hoverOut() {

    d3.select("#info").transition().duration(500).style("opacity", 0);
}

function xhrRequest() {

    console.log("API CALL");
}

function centerZoom(data){

  var o = topojson.mesh(data, data.objects.polygons, function(a, b) { return a === b; });

  projection
      .scale(1)
      .translate([0, 0]);

  var b = path.bounds(o),
      s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
      t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

  var p = projection
      .scale(s)
      .translate(t);

  return o;

}

function drawOuterBoundary(data, boundary){

  g.append("path")
      .datum(boundary)
      .attr("d", path)
      .attr("class", "subunit-boundary")
      .attr("fill", "none")
      .attr("stroke", "#3a403d");

}

function drawPlaces(data){

  g.append("path")
      .datum(topojson.feature(data, data.objects.places))
      .attr("d", path)
      .attr("class", "place");

  g.selectAll(".place-label")
      .data(topojson.feature(data, data.objects.places).features)
      .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("dy", ".35em")
      .attr("x", 6)
      .attr("text-anchor", "start")
      .style("font-size", ".7em")
      .style("text-shadow", "0px 0px 2px #fff")
      .text(function(d) { return d.properties.name; });

}

function drawSubUnits(data){

  var subunits = g.selectAll(".subunit")
      .data(topojson.feature(data, data.objects.polygons).features)
      .enter().append("path")
      .attr("class", "subunit")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1px");

  return subunits;

}

function drawSubUnitLabels(data){

  g.selectAll(".subunit-label")
      .data(topojson.feature(data, data.objects.polygons).features)
      .enter().append("text")
      .attr("class", "subunit-label")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", ".5em")
      .style("text-shadow", "0px 0px 2px #fff")
      .style("text-transform", "uppercase")
      .text(function(d) { return d.properties.st_nm; })
      .on('mouseover', function(d){
        var state_name = d.properties.st_nm;
        hoverOver(state_name);
      })
      .on('mouseout', function(){
        hoverOut();
      })
      .on('click', xhrRequest);

}

function colorSubunits(subunits) {

  var c = d3.scale.ordinal(d3.schemeCategory20);
  subunits
      .style("fill", function(d,i){ return c(i); })
      .style("opacity", ".6");

}

function particle() {
  var x = d3.mouse(this);

  g.insert("circle", "rect")
      .attr("cx", x[0])
      .attr("cy", x[1])
      .attr("r", 1e-6)
      .style("stroke", d3.hsl((index = (index + 1) % 360), 1, .5))
      .style("stroke-opacity", 1)
      .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 100)
      .style("stroke-opacity", 1e-6)
      .remove();

  d3.event.preventDefault();
}


function drawForceDirected(data, subunits, boundary){
  var states = topojson.feature(data, data.objects.polygons)
  var nodes = [], links = [];

  states.features.forEach(function(d, i) {
    if (d.id === 2 || d.id === 15 || d.id === 72) return;
    var centroid = path.centroid(d);
    if (centroid.some(isNaN)) return;
    centroid.x = centroid[0];
    centroid.y = centroid[1];
    centroid.feature = d;
    nodes.push(centroid);
  });

  d3.geom.voronoi().links(nodes).forEach(function(link) {
    var dx = link.source.x - link.target.x,
        dy = link.source.y - link.target.y;
    link.distance = Math.sqrt(dx * dx + dy * dy);
    links.push(link);
  });

  force
      .gravity(0)
      .nodes(nodes)
      .links(links)
      .linkDistance(function(d) { return d.distance; })
      .start();

  var link = svg.selectAll("line")
      .data(links)
    .enter().append("line")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  var node = svg.selectAll("g")
      .data(nodes)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + -d.x + "," + -d.y + ")"; })
      .call(force.drag)
    .append("path")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("d", function(d) { return path(d.feature); });

  force.on("tick", function(e) {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  });

}
