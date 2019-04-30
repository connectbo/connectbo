<?php
	require "../dbconnectbo.php";
	if(isset($_POST['videoid'])){
		$search_vid = $_POST['videoid'];
		//search database
		$result_query = "select title,genre,keywords,duration,color,sound,sponsorname from p4records where videoid ='". $search_vid."'";
		if ($result = mysqli_query($db,$result_query)) {
				while ($row = mysqli_fetch_row($result)) {
					echo "<strong>".$row[0]."</strong>\n\n";
					echo "<div><strong>Genre:</strong> ".$row[1]."</div>\n";
					echo "<div><strong>Keywords:</strong>  ".$row[2]."</div>\n";
					echo "<div><strong>Duration:</strong>".$row[3]."</div>\n";
					echo "<div><strong>Color:</strong> ".$row[4]."</div>\n";
					echo "<div><strong>Sound:</strong> ".$row[5]."</div>\n";
					echo "<div><strong>Sponsor:</strong> ".$row[6]."</div>\n";
				}
			}
	}
?>