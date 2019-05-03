<?php
	date_default_timezone_set("EST"); 
	session_start();
	require "../dbconnectbo.php";
	if(!isset($_SESSION['userid'])){
		echo "You are not logged in.";
		echo '<a href ="index.php">Please redirect to this link to login in</a></br>';
	}
	else{
		if(isset($_POST['text'])){
			$_SESSION['postbox'] = mysqli_real_escape_string($db,$_POST['text']);
			$userid = mysqli_real_escape_string($db,$_SESSION['userid']);
			$time = date('Y-m-d h:m:s',time());
			$insert_query = "insert into cheeps (cheep_text, created_date, user_id) VALUES ('".$postbox."','".$time."','".$userid."')";
			if($result= mysqli_query($db,$insert_query)){
				echo "Cheep Posted Successfully!!";
			}
			else{
				echo "Cheep Posted Unsuccesfully!!";
			}
		}
	}
?>
