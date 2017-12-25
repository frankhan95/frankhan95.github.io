(function(){

	//Hexagon Configurations
	var numHexagons = 3;	var rows = 2;
	var size = 100; 						//distance from center to corner point
	var spacing = 20;	//
	var bgColumn = 6;
	var bgRow = 6;
	var hexFill = "white";
	var hexStroke = "black";
	var bgFill = "rgb(68, 68, 68)";
	var interestName = ["Database", "Web Dev", "Visualizations", "Tools", "Game Dev", "GIS"];
	var iconNames = ["database_icon.png", "code_icon.png", "visual_icon.png", "tool_icon.png", "gamedev_icon.png", "map_icon.png"];

	//SVG Configurations
	var svgWidth = 900;
	var svgHeight = 600;

	//Global vars
	var hexagonCenters = [], range = numHexagons * rows;
	var bgHexagons =[], range = bgColumn * bgRow;

	var hexCanvas = d3.select("body").selectAll('.hexCanvas')
	.attr("width", svgWidth)
	.attr("height", svgHeight);
	layoutBackground();
	formatInterestHexagons();
	drawInterestHexagons();
	bindOnClick();
	bindOnClickBG();



	function layoutBackground() {
		var x = -getWidth() - spacing;
		var y = -(size + spacing) *  2.5;
		var pointer = 0;
		var bgGroup = hexCanvas.append("g")
		.attr("id", "hexagonBG")
		.attr("transform", "translate(" + x + "," + y + ")");
		for(var j = 0; j < bgRow; j++){
			var hOffSet = (getWidth()/2 + spacing/2);
			var vOffset = spacing/2;
			if(j%2 == 0) {
				hOffSet =  0;
			}
			var yPos = (vOffset + size) * 2* .75* (j + 1);
			pointer = addRowOfHexagons(hOffSet, yPos, bgHexagons, pointer, bgColumn);
		}

		var bgHex = bgGroup.selectAll(".hexTile")
		.data(bgHexagons)
		.enter()
		.append("polygon")
		.attr("points", function(d){
			return d.pointList.map(function(d){
				return [d.xPos, d.yPos].join(",");
			}).join(" ");
		})
		.classed("hexTile",true)
		.attr("stroke", bgFill)
		.attr("fill", bgFill)
		.attr("stroke-width", 22);
	}


	//
	function formatInterestHexagons(){
		var pointer = 0;
		for(var j = 0; j < rows; j++){
			var hOffSet = getWidth()/2 + spacing/2;
			var vOffset = spacing / 2;
			if(j%2 == 0) {
				hOffSet = 0;
			}
			var yPos = (vOffset + size) * 2* .75* (j + 1);
			pointer = addRowOfHexagons(hOffSet, yPos, hexagonCenters, pointer, numHexagons);
		}
	}

	//Instantiates consecutive hexagons on the same row.
	function addRowOfHexagons(horizOffset, yPos, hexArray, hexPointer, rowSize){
		for(var i = 0; i < rowSize; i++){
			var xPos = toInt(horizOffset + (spacing + getWidth()) * (i+1));
			var pointString = createPointsForHex(xPos, yPos);
			var centerCoords = {pointList: pointString, x: xPos, y: yPos, interest: interestName[hexPointer], icon: iconNames[hexPointer]};
			hexArray[hexPointer] = centerCoords;
			hexPointer++;
		}
		return hexPointer;
	}

	function bindOnClickBG(){
		d3.selectAll(".hexTile")
		.on("mouseover", function(d) {
			d3.select(this)
			.transition()
			.duration(500)
			.attr("stroke-width", 2);
		})
		.on("mouseout", function(d){
			d3.select(this)
			.transition()
			.duration(1000)
			.attr("stroke-width", 22);
		});
	}

	function bindOnClick(){
		d3.selectAll(".interestHexagons, image, text")
		.on("mouseover", function(d) {
			d3.select("#"+d.interest.replace(/ /g,'')+ " text")
			.transition()
			.duration(1500)
			.style("opacity", 1.0);
		});
	}

	//Draws the hexagons from the list of points onto the svg.
	function drawInterestHexagons(){
		var group = hexCanvas.selectAll(".interestHexagons")
		.data(hexagonCenters)
		.enter()
		.append("g")
		.attr("id", function(d){
			return d.interest.replace(/ /g,''); 
		})

		//Add hexagons
		group.append("polygon")
		.attr("points", function(d){
			return d.pointList.map(function(d){
				return [d.xPos, d.yPos].join(",");
			}).join(" ");
		})
		.classed(".interestHexagons", true)
		.attr("stroke", bgFill)
		.attr("fill", hexFill)
		.attr("stroke-width", 2);
		//Add Icons
		var dimensions = size * .75;
		group.append("svg:image")
		.attr("xlink:href", function(d){
			return "hexagon_icons/" + d.icon;
		})
		.attr("width", dimensions)
		.attr("height", dimensions)
		.attr("x", function(d){ return d.x - dimensions/2;})
		.attr("y", function(d){ return d.y - dimensions * .6;});
		//Add Labels
		var fontSize = toInt(size / 5) + "px";
		group.append("text")
		.attr("x", function(d){
			return d.x;
		})
		.attr("y", function(d){
			return d.y + size * .5;
		})
		.text(function(d) {return d.interest})
		.attr("id", function(d) { return d.interest.replace(/ /g,'')+"Text";})
		.attr("font-family", "sans-serif")
		.attr("font-size", fontSize)
		.attr("fill", "rgb(68, 68, 68)")
		.attr("text-anchor", "middle")
		.style("opacity", 0.0);

	}

	//Adds all the hexagon corner coords into an array and returns it
	function createPointsForHex(centerX, centerY){
		var pointNumbers = [], range = 6;
		for(var i = 0; i < range; i++){
			pointNumbers[i] = hex_corner(centerX, centerY, i);
		}
		return pointNumbers;
	}

	//rounds a value to an integer and returns
	function toInt(n){ return Math.round(Number(n)); };

	//Helper class: calculate a hexagon corner
	//Given a center (x,y) and index, returns the coords of a hexagon corner
	function hex_corner(centerX, centerY, i){
	    var angle_deg = 60 * i   + 30;
	    var angle_rad = Math.PI / 180 * angle_deg;
	    var x = centerX + size * Math.cos(angle_rad);
	    var y = centerY + size * Math.sin(angle_rad);
	    var point = {xPos: toInt(x), yPos: toInt(y)};
	    return point;
	}

	function getWidth() {
		var angle_rad = Math.PI / 180 * 30;
		var temp = size * 2 * Math.cos(angle_rad);
		return temp;
	}
	
})();