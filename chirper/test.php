<?php
  session_start();
  require "/fs1/home/bo7/dbconnect.php";
  if(!isset($_SESSION['count'])){
    $_SESSION['count'] = 0;
  }
   $_SESSION['count']++;
  echo "Test message". $_SESSION['count'];
?>
