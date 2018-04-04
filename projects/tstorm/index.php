<!doctype html>

<html lang="en">
<head>
 	<meta charset="utf-8">
  	<title>Tropical Storm CSV</title>
  	<script src="convert_data.js"></script>
</head>

<body>
	<form id = "dropdown" action = "index.php" method = "get">
		Year 
		<select id = "select" name = "year">
			<option value = "2008">2008</option>
			<option value = "2009">2009</option>
			<option value = "2010">2010</option>
			<option value = "2011">2011</option>
			<option value = "2012">2012</option>
			<option value = "2013">2013</option>
			<option value = "2014">2014</option>
			<option value = "2015">2015</option>
			<option value = "2016">2016</option>
			<option value = "2017">2017</option>
			<option value = "2018">2018</option>
		</select> 
		<input type ="submit">
	</form>
	<ul id = "storms"></ul>

<script>
	var dropdown = document.getElementById('dropdown');
	var value = document.getElementById('select').value;
	
	<?php 
		if(!isset($_GET["year"])){
			return;
		}
		$noaa = new DOMDocument();
		$url = 'http://www.ssd.noaa.gov/PS/TROP/DATA/' . $_GET["year"] .'/tdata/wpac/';
		$noaa->loadHTMLFile($url);
		$links = $noaa->getElementsByTagName('a');
		$storms_array = array();
		foreach($links as $link){
			if(preg_match('/.+\.html$/',$link->nodeValue)){
				array_push($storms_array, $link->nodeValue);
			}
		}
	?>

	var storm_list = <?php echo json_encode($storms_array); ?>;
	var temp = <?php echo json_encode($_GET["year"]); ?>;
	var container = document.getElementById('storms');
	container.innerHTML = "";
	document.getElementById('select').value = temp;
	for(var i = 0; i < storm_list.length; i++){
		var li = document.createElement('LI');
		var a = document.createElement('a');
		var stormName = storm_list[i].split(".")[0];
		a.setAttribute('href', "download.php/?year="+temp+"&html="+stormName);
		a.setAttribute('target', '_blank');
		a.innerHTML = storm_list[i];
		li.appendChild(a);
		container.appendChild(li);
	}



</script>
</body>
</html>