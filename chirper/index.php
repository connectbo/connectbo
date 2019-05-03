<html>
<head>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<link href="index-style.css" rel="stylesheet"/>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

</head>
<body>
<?php
    session_start();
    require "../dbconnectbo.php";
    if(isset($_SESSION['userid'])){
      $_SESSION = array();
      setcookie(session_name(), '', time()-42000, '/');
      session_destroy();
    }
    else{
    if (isset($_POST['inputUsername']) && isset($_POST['inputPassword'])){
    require "/fs1/home/bo7/dbconnect.php";
    $fuser = mysqli_real_escape_string($db,$_POST['inputUsername']);
    $sha1_pass = sha1($_POST['inputPassword']);
    $query = "select firstname, usertype, user_id, lastname, username from users where username = '$fuser' ". "and password = '$sha1_pass'";
    if ($result = mysqli_query($db,$query)) {
    $num_rows = mysqli_num_rows($result);
    if ($num_rows > 0) {
    $row = mysqli_fetch_row($result);
    $_SESSION['firstname'] = $row[0];
    $_SESSION['usertype'] = $row[1];
    $_SESSION['userid'] = $row[2];
    $_SESSION['lastname'] = $row[3];
    $_SESSION['username'] = $row[4];
      }
    }
      header('Location: home.php');
  }
}
?>
<section class="login-block">
    <div class="container">
        <div class="row">
            <div class="col-md-4 login-sec">
                <h2 class="text-center">Login Now</h2>
                <form class="login-form" method="post" action="home.php">
                    <div class="form-group">
                        <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                        <input type="text" class="form-control" name="inputUsername" placeholder="">

                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                        <input type="password" class="form-control" name="inputPassword" placeholder="">
                    </div>


                    <div class="form-check">
                        <button href="home.php" class="btn btn-login float-left">Guest Login</button>
                        <button type="submit" class="btn btn-login float-right">Submit</button>
                    </div>
                </form>
                <div class="copy-text">Created with <i class="fa fa-heart"></i> by Bo Zhou</div>
            </div>
            <div class="col-md-8 banner-sec">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                          <div class="crop">
                            <img src="https://opal.ils.unc.edu/~bo7/uploads/UNC.png" />
                            <div class="carousel-caption d-none d-md-block">
                                <div style='font-size:37px' class="banner-text">
                                    <h2 style='margin-bottom:40px'>Welcome Tar Teels!</h2>
                                    <p style='margin-bottom:165px'>See what innovation is happening at future of Carolina</p>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
</body>
</html>