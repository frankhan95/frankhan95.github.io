(function() {

	var width = 1000, height = 600, sens = 0.25;
  var angles = { x: 120, y: -40, z: 0}

  //Reference to svg
	var svg = d3.select("#mapContainer").append("svg")
    .attr("width", width)
    .attr("height", height);

	//Setup path for globe
	var projection =d3.geoStereographic()
  .translate([width / 2, height / 2])
  .rotate([angles.x, angles.y, angles.z])
  .scale(300);

  //prime path and projection
  var path = d3.geoPath()
	.projection(projection)
  .pointRadius(2);
  //Read data and Bind geography to svg paths
	d3.json("world-countries.json", function(error, d){
		if(error) throw error;

		svg.selectAll("path.land")
		.data(d.features)
		.enter().append("path")
		.attr("d", path)
    .attr("class", "land");
	});

  //Initialize map rotation
  var autorotate, now, diff, roation;
  var degPerSec = 6;
  var degPerMs = degPerSec / 1000;
  var lastTime = d3.now();
  autorotate = d3.timer(rotate);

  function rotate(elapsed) {
    now = d3.now();
    diff = now - lastTime;
    if (diff < elapsed) {
      var rotation = projection.rotate();
      rotation[0] += diff * degPerMs;
      projection.rotate(rotation);

      //update rendering
      path = d3.geoPath().projection(projection);
      d3.selectAll("path.land").attr("d", path);
    }
    lastTime = now;
  }

})();