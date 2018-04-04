<!doctype html>

<html lang="en">
<head>
    <meta charset="utf-8">
  	<title>Tropical Storm CSV</title>
</head>

<body>
	<div id = "main"></div>
  <button id = "download" type="button" onclick="alert('Hello world!')">Download CSV</button>
</body>

<script>

  <?php 

  $noaa = new DOMDocument();
  $url = 'http://www.ssd.noaa.gov/PS/TROP/DATA/' . $_GET["year"] .'/tdata/wpac/'.$_GET["html"].'.html';
  $noaa->loadHTMLFile($url);
  $text = $noaa->getElementsByTagName('pre');
  $data = $text[0]->nodeValue;

  ?>

  var getYear = <?php echo json_encode($_GET["year"]); ?>;
  var html = <?php echo json_encode($_GET["html"]); ?>;
  var data_table = <?php echo json_encode($data); ?>;
  var pre = document.createElement('pre');
  pre.innerHTML = data_table;
  document.getElementById("main").appendChild(pre);

  //Cleans the string by removing unwanted formatting
  function cleanData(string){
  	var data = string;
  	data = data.replace(/-\|/g, "");
    data = data.replace(/\n/g, '');
  	data = data.replace(/[-]{2,}/g, "\n");
  	data = data.replace(/\|/g, ",");
  	return data;
  }

  //Displays a preview of the data
  function displayData(data){
    data = data.replace(/\n/g, '<br>');
    document.getElementById("main").innerHTML = data;

  }

  //Clicking the download button will trigger this method. Converts the string
  //into a csv and allows the browser to save it.
  function download(filename, text) {
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      pom.setAttribute('download', filename);

      if (document.createEvent) {
          var event = document.createEvent('MouseEvents');
          event.initEvent('click', true, true);
          pom.dispatchEvent(event);
      }
      else {
          pom.click();
      }
  }
  var content = cleanData(data_table);
  document.getElementById('download').onclick = function(){ download(html + getYear +".csv", content);};
  document.getElementById('download').innerHTML = "Download " + html + getYear + ".csv";

</script>
</html>