(function(){

	//Hexagon Configurations
	var numHexagons = 3;	var rows = 2;
	var size = 60; 						//distance from center to corner point
	var spacing = 20;	//
	var bgColumn = 5;
	var bgRow = 2;
	var hexFill = "white";
	var hexStroke = "#e7e7e7";
	var interestName = ["Database", "Web Dev", "Visualizations", "Tools", "Game Dev", "GIS"];
	var iconNames = ["database_icon.png", "code_icon.png", "visual_icon.png", "tool_icon.png", "gamedev_icon.png", "map_icon.png"];

	//SVG Configurations
	var svgWidth = 450;
	var svgHeight = 250;

	//Global vars
	var hexagonCenters = [], range = numHexagons * rows;
	var bgHexagons =[], range = bgColumn * bgRow;

	var hexCanvas = d3.select("body").selectAll('#hexCanvas')
	.attr("width", svgWidth)
	.attr("height", svgHeight);

	var x = -getWidth() - spacing;
	var y = -(size + spacing) *  2.5;
	var hexGroup = hexCanvas.append("g")
		.attr("id", "hexGroup")
		.attr("transform", "translate(" + x/2 + "," +(y/5) + ")");


	formatInterestHexagons();
	drawInterestHexagons();
	bindOnClick();


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
			var centerCoords = {pointList: pointString, x: xPos, y: yPos, interest: interestName[hexPointer], icon: iconNames[hexPointer], bg: {}};
			hexArray[hexPointer] = centerCoords;
			hexPointer++;
		}
		return hexPointer;
	}

	function bindOnClick(){
		d3.selectAll(".interestHexagons, image, text")
		.on("mouseover", function(d) {
			d3.select("#"+d.interest.replace(/ /g,'')+ " text")
			.transition()
			.duration(1000)
			.style("opacity", 1.0);
			d3.select("#"+d.interest.replace(/ /g,'')+ "BG")
			.transition()
			.duration(500)
			.attr("stroke-width", "2px")
			.attr("stroke", "#2bf4ff");
			d3.selectAll("."+d.interest.replace(/ /g,'')+ "Hex")
			.classed("skillHighlight", true);
		})
		.on("mouseout", function(d){
			d3.select("#"+d.interest.replace(/ /g,'')+ "BG")
			.transition()
			.duration(500)
			.attr("stroke", hexStroke)
			.attr("stroke-width", "20px");
			d3.selectAll("."+d.interest.replace(/ /g,'')+ "Hex")
			.classed("skillHighlight", false);
		});;
	}

	//Draws the hexagons from the list of points onto the svg.
	function drawInterestHexagons(){
		var group = hexGroup.selectAll(".interestHexagons")
		.data(hexagonCenters)
		.enter()
		.append("g")
		.attr("id", function(d){
			return d.interest.replace(/ /g,''); 
		})
		.classed("hexagonGroup", true);

		/*var whiteBG = group.append("polygon")
		.attr("points", function(d){
			return d.pointList.map(function(d){
				return [d.xPos, d.yPos + size/10].join(",");
			}).join(" ");
		})
		.classed("staticHexBG", true)
*/
		//background
		/*var background = group.append("polygon")
		.attr("points", function(d){
			return d.pointList.map(function(d){
				return [d.xPos, d.yPos + size/10].join(",");
			}).join(" ");
		})
		.classed("onClickHex", true)
		.attr("id", function(d) { return d.interest.replace(/ /g,'')+"BG";})
		.attr("stroke-width", "20px")
		.attr("stroke", hexStroke);*/

		//Add hexagons
		group.append("polygon")
		.attr("points", function(d){
			return d.pointList.map(function(d){
				return [d.xPos, d.yPos].join(",");
			}).join(" ");
		})
		.classed("interestHexagons", true)
		
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
		.attr("font-size", fontSize)
		.attr("fill", "black")
		.attr("text-anchor", "middle")
		.classed("hexagonText", true);

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