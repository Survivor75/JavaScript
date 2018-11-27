function tooltipHtml(n, id, d) {
    return "<h5>" + id + "</h5>" +
        "<h5>" + n + "</h5>";
}

function getRandomColor() {
    var i = Math.floor((Math.random() * 7))
    colors = ["#d4e157", "#66bb6a", "#26a69a", "#ffa726", "#bdbdbd", "#ff9e80", "#8d6e63"]
    return  colors[i]
}

var sampleData = {};

["AP", "AR", "AS", "BR", "CT", "DL", "GA", "GJ", "HR", "HP", "JK", "JH", "KA", "KL", "MP", "MH", "MN", "ML", "MZ",
"NL", "OR", "PB", "RJ", "SK", "TN", "TR", "UP", "UT", "WB"].forEach(function(d) {
    var low = Math.round(100 * Math.random());
    sampleData[d] = { color: getRandomColor()};
});


d3.select(self.frameElement).style("height", "1000px");

d3.json("https://api.myjson.com/bins/l36bq", function(json) {
  var width = 3000, height = 1500, centered;

    var projection = d3.geo.mercator()
        .scale(1500)
        .translate([width/2, height/2]);

    var path = d3.geo.path()
        .projection(projection);

    function mouseOver(d) {

        d3.select("#tooltip").transition().duration(250).style("opacity", .7);
        d3.select("#tooltip").html(tooltipHtml(d.n, d.id, sampleData[d.id]))
            .style("left", (d3.event.layerX) + "px")
            .style("top", (d3.event.layerY) + "px");
    }

    function mouseOut() {

        d3.select("#tooltip").transition().duration(500).style("opacity", 0);
    }

    function Click(d) {
        delete d.d
        console.log("API CALL");
    }
    
    var svg = d3.select("#statesvg")
        .append("svg")
        .attr("width" , "100%")
        .attr("height", "100%")
        .append("g");


    var eS = svg.selectAll(".state")
        .data(json)
        .enter()
        .append("g");

    eS.append("path")
        .attr("class", "state")
        .attr("d", function(d) {
            return d.d;
        })
        .style("fill", function(d) {
            return sampleData[d.id].color;
        })
        .on("mousemove", mouseOver).on("mouseout", mouseOut).on("click", Click)

    eS.append("text")
        .attr("fill", "black")
        .attr("transform", function(d) {
            var bbox = this.previousSibling.getBBox();
            return "translate(" + (bbox.x + bbox.width/2) + "," + (bbox.y + bbox.height/2) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(function(d) {
            return d.id;
        });
});
