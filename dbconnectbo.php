<?php
        $h = 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
        $u = 'fbmqmr21m3u9teq9';
        $p = 'kjwvt8ge5h8vspxp';
        $dbname = 'umxeumhyjae6jbrf';
        $db = mysqli_connect($h,$u,$p,$dbname);
        if (mysqli_connect_errno()){
                echo "Connection failed" . mysqli_connect_error();
                exit();
        }
?>
