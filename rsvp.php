<?php
    if(isset($_POST['name'])){
        require "../dbconnectbo.php";
        $name = mysqli_real_escape_string($db,$_POST['name']);
        $email = mysqli_real_escape_string($db,$_POST['email']);
        $subject = mysqli_real_escape_string($db,$_POST['subject']);
        $insert_query = "insert into rsvp (name, email, subject) VALUES ('".$name."','".$email."','".$subject."')";
        if($result= mysqli_query($db,$insert_query)){
            echo "Message Added!";
        }
        else{
            echo "Message Failed to Add!";
        }
    }
?>