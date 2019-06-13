<?php
	date_default_timezone_set("EST"); 
		if(isset($_POST['text'])){
			require "../dbconnectbo.php";
			$postbox = mysqli_real_escape_string($db,$_POST['text']);
			$userid = mysqli_real_escape_string($db,$_POST['userid']);
			$time = date('Y-m-d h:m:s');
			$insert_query = "insert into cheeps (cheep_text, created_date, user_id) VALUES ('".$postbox."','".$time."','".$userid."')";
			if($result= mysqli_query($db,$insert_query)){
				echo "Cheep Posted Successfully!";
			}
			else{
				echo "Cheep Posted Unsuccesfully!";
			}
		}
?>