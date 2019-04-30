<?php
	require "../dbconnectbo.php";
	if(isset($_POST['text'])){
		$search_string = $_POST['text'];
		$sugg_query = "select * from p4sugg where text LIKE '". $search_string."%'";
		if ($result = mysqli_query($db,$sugg_query)) {
				while ($row = mysqli_fetch_row($result)) {
					echo $row[0]."<br/>";
				}
			}
	}
?>