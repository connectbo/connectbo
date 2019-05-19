<?php
/**
 * Returns the list of cars.
 */
require 'https://www.connectbo.com/dbconnectbo.php';
    
$cheeps = [];
$sql = "SELECT cheep_id, cheep_text, created_date, user_id FROM cheeps";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cheeps[$cr]['id']    = $row['cheep_id'];
    $cheeps[$cr]['text'] = $row['cheep_text'];
    $cheeps[$cr]['date'] = $row['created_date'];
    $cheeps[$cr]['userid'] = $row['user_id'];
    $cr++;
  }
    
  echo json_encode(['data'=>$cheeps]);
}
else
{
  http_response_code(404);
}
