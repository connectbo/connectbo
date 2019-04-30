<title>Open Video Search System</title>
<head>
<!-- In this project, bootstrap is used to make layout prettier. -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="result-style.css" />
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script>
	//check if the document is ready
	$(document).ready(function(){
		//check if there is keyup event
		$("#s1").keyup(function(){
			ori_text = $("#s1").val();
			//use ajax to send request to external php file
			$.ajax({
				method:"POST",
				url: "keyword-suggestions.php",
				data:{
					text: ori_text
				},
				dataType: "html",
				success: function(data){
					// use .html to change result and display in HTML format instantly
					$("#s2").html(data);
				}
			});
		});
		//check if there is a mouseover event on search box
		$(".result_list").mouseover(function(){
			videoid = $(this).attr('videoid');
			$.ajax({
				method:"POST",
				url: "result-details.php",
				data:{
					videoid: videoid
				},
				dataType: "html",
				success: function(data){
					$("#d1").html(data);
				}
			});
		});
		//if mouse left a search result, the video details would disappear
		$(".result_list").mouseout(function(){
			$("#d1").html("");
		});
		//if a user move mouses out of the search box, in other words, already started searching, then the suggestions would disappear
		$("#s1").mouseout(function(){
			$("#s2").html("");
		});
	});
</script>
</head>
<body>
<nav class="navbar navbar-dark bg-primary">
  <a class="navbar-brand" href="results.php">Open Video</a>
</nav>
<br/>
<div class="container">
    <div class="row">
        <div id="search" class="col order-first">
        	<!-- use get method to retrieve search query -->
            <form name="searchbox" method="GET" action="results.php">
                Search:
                <br/>
                <input class="form-control mr-sm-2" id="s1" name="search" placeholder="Video to Search" aria-label="Search"/>
                <br>
                <button type="submit" value="Search" class="btn btn-primary">Search</button><br/>
                <hr/> Suggestions:
                <br>
                <!-- result would display in a div class -->
                <div id="s2">No current suggestions.</div>
            </form>
        </div>
        <div class="col">
        <?php
		if(isset($_GET['search'])){
		require "../dbconnectbo.php";
		// check if there is a search query, if yes, then search it 
		$search_word = htmlentities(mysqli_real_escape_string($db,$_GET['search']));
		$search_query="select videoid, creationyear,title,description from p4records where match (title,description,keywords) against ('".$search_word."')";
		echo "Showing results for: ".$search_word."<br><br>";
		//print out formatted result
		if ($result = mysqli_query($db,$search_query)) {
				while ($row = mysqli_fetch_row($result)) {
					echo '<div class="result_list" videoid="'.$row[0].'">';
					echo "<strong>".$row[2]."</strong>(".$row[1].")<br>";
					echo $row[3]."<br></div><br>";
				}
			}
		}
		?>
        </div>
        <div class="col order-last">
            <div id="d1" cols="30" rows="40">
            </div>
        </div>
    </div>
</div>
</body>