<html>

<head>
    <title>Chirper@UNC</title>
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#share-btn").click(function() {
                user_id = $("#divhiddenid").text();
                post_text = $("#message").val();
                $.post("post_cheep.php", {
                        text: post_text,
                        userid: user_id
                    },
                    function(data, stauts) {
                        $("#message").val("");
                        if (confirm(data)) {
                            window.location.reload();
                        }
                    }
                ).fail(function() {
                    console.log("error");
                });
            });
        });
    </script>
    <style>
        body {
            background-color: #eeeeee;
            font-family: 'Ubuntu', sans-serif;
        }

        .h7 {
            font-size: 0.8rem;
        }

        .gedf-wrapper {
            margin-top: 0.97rem;
        }

        .navbar-custom {
            color: #FFFFFF;
            background-color: #4B9CD3;
        }

        .white {
            color: #FFFFFF;
        }

        .buttonwhite {
            color: #4B9CD3;
            background-color: white;
        }
        }

        /*@media (min-width: 992px) {
            .gedf-main {
                padding-left: 4rem;
                padding-right: 4rem;
            }
            .gedf-card {
                margin-bottom: 2.77rem;
            }
        }*/
        /**Reset Bootstrap*/
    </style>
</head>

<body>
    <?php
    session_start();
    require "../dbconnectbo.php";
    if (!isset($_SESSION['firstname'])) {
        alert("Please log in to use Chirper@UNC");
    }
    if (!isset($_SESSION['following'])) {
        $query1 = "select COUNT(follows_id) from follows where user_id = '" . $_SESSION['userid'] . "'";
        if ($result = mysqli_query($db, $query1)) {
            while ($row = mysqli_fetch_row($result)) {
                $_SESSION['following'] = $row[0];
            }
        }
    }
    if (!isset($_SESSION['followed'])) {
        $query2 = "select COUNT(follows_id) from follows where follows_id = '" . $_SESSION['userid'] . "'";
        if ($result = mysqli_query($db, $query2)) {
            while ($row = mysqli_fetch_row($result)) {
                $_SESSION['followed'] = $row[0];
            }
        }
    }
    if (isset($_GET['search_text'])) {
        $match_text = mysqli_real_escape_string($db, $_GET['search_text']);
        $_SESSION['query'] = "select users.firstname, users.lastname, users.username, cheeps.cheep_text, cheeps.created_date from users, cheeps where cheeps.user_id =users.user_id AND MATCH(cheeps.cheep_text) AGAINST ('$match_text') order by cheeps.created_date DESC limit 20";
    } else {
        $_SESSION['query'] = "select distinct users.firstname, users.lastname, users.username, cheeps.cheep_text, cheeps.created_date from users, follows, cheeps where follows.user_id='" . $_SESSION['userid'] . "' AND (cheeps.user_id =follows.follows_id OR cheeps.user_id ='" . $_SESSION['userid'] . "')AND users.user_id = cheeps.user_id order by cheeps.created_date DESC limit 20";
    }
    if (isset($_SESSION['query'])) {
        $_SESSION['cheep_first'] = array();
        $_SESSION['cheep_last'] = array();
        $_SESSION['cheep_user'] = array();
        $_SESSION['cheep_text'] = array();
        $_SESSION['cheep_date'] = array();
        if ($result = mysqli_query($db, $_SESSION['query'])) {
            while ($row = mysqli_fetch_assoc($result)) {
                preg_match_all('/#\w+/', $row["cheep_text"], $match_hashtags);
                foreach ($match_hashtags[0] as $a) {
                    preg_match('/\w+/', $a, $b);
                    $row["cheep_text"] = preg_replace("/(" . $a . ")/", "<a href='home.php?match_text=" . $b[0] . "&match_type=all'>" . $a . "</a>", $row["cheep_text"]);
                }
                array_push($_SESSION['cheep_first'], $row["firstname"]);
                array_push($_SESSION['cheep_last'], $row["lastname"]);
                array_push($_SESSION['cheep_user'], $row["username"]);
                array_push($_SESSION['cheep_text'], $row["cheep_text"]);
                array_push($_SESSION['cheep_date'], $row["created_date"]);
            }
        }
        mysqli_close($db);
    }
    #Sanitize each input with htmlentities and striip
    function sanitize_input($s)
    {
        $sanitized_data = htmlentities(strip_tags(trim($s)));
        return $sanitized_data;
    }
    ?>
    <nav class="navbar navbar-light navbar-custom">
        <a href="home.php" class="navbar-brand">Chirper@UNC</a>
        <form class="form-inline" method="GET" action="home.php">
            <div style="padding-top: 4px" class="input-group">
                <input type="text" name="search_text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary buttonwhite" type="submit" id="button-addon2">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <a class="nav-link white" href="index.php">Logout</a>
        </form>
    </nav>

    <br />
    <div class="container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <div class="h5">@<?php echo $_SESSION['username']; ?></div>
                        <div class="h7 text-muted">Fullname : <?php echo $_SESSION['firstname'] . " " . $_SESSION['lastname']; ?></div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="h6 text-muted">Followers</div>
                            <div class="h5"><?php echo $_SESSION['followed']; ?></div>
                        </li>
                        <li class="list-group-item">
                            <div class="h6 text-muted">Following</div>
                            <div id="divhiddenid" style="display: none;" value='<?php echo $_SESSION['userid']; ?>'><?php echo $_SESSION['userid']; ?></div>
                            <div class="h5"><?php echo $_SESSION['following']; ?></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6 gedf-main">
                <div class="card gedf-card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make
                                    a publication</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea class="form-control" id="message" name="message" rows="3" placeholder="今天不准想其他的事情哦，臭猪要开心~"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button id="share-btn" type="button" class="btn btn-primary">share</button>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
                if (isset($_SESSION['cheep_text'])) {
                    for ($i = 0; $i < count($_SESSION['cheep_user']); $i++) {
                        echo '<br/>
                 <div class="card gedf-card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">@' . sanitize_input($_SESSION['cheep_user'][$i]);
                        echo '</div><div class="h7 text-muted">' . sanitize_input($_SESSION['cheep_first'][$i]) . " " . sanitize_input($_SESSION['cheep_last'][$i]);
                        echo '</div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>' . sanitize_input(date_format(date_create($_SESSION['cheep_date'][$i]), 'M d G:i A'));
                        echo '</div><p class="card-text">' . $_SESSION['cheep_text'][$i] . "</p></div>
                </div>";
                    }
                }
                ?>
                <br />
                <!-- <div class="card gedf-card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">@LeeCross</div>
                                    <div class="h7 text-muted">Miracles Lee Cross</div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>10 min ago</div>
                        <a class="card-link" href="#">
                            <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                        </a>

                        <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor
                            sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste voluptates.
                        </p>
                        <div>
                            <span class="badge badge-primary">JavaScript</span>
                            <span class="badge badge-primary">Android</span>
                            <span class="badge badge-primary">PHP</span>
                            <span class="badge badge-primary">Node.js</span>
                            <span class="badge badge-primary">Ruby</span>
                            <span class="badge badge-primary">Paython</span>
                        </div>
                  </div>
                </div>
                <br/> -->
            </div>
            <!--<div class="col-md-3">
                 <div class="card gedf-card">
                    <div class="card-body">
                        <h5 class="card-title">Tar Teels</h5>
                        <h6 class="card-subtitle mb-2 text-muted">@School of Information and Library Science</h6>
                        <p class="card-text">UNC-Chapel Hill's Information Science Program is TOP-RANKED among nations.</p>
                        <a href="https://www.usnews.com/best-graduate-schools/top-library-information-science-programs/university-of-north-carolina-at-chapel-hill-199120?int=a31a09#" class="card-link">#1
                            in Information and Library Science by U.S. News & World Report</a><br />
                    </div>
                </div> -->
                <div class="col-md-3">
                    <div class="card gedf-card">
                        <div class="card-body">
                            <h5 class="card-title">Happy birthday to My Babe Meng!</h5>
                            <h6 class="card-subtitle mb-2 text-muted">世界上无敌可爱的兔子蒙蒙</h6>
                            <p class="card-text">北卡最会穿衣打扮的殿堂级性感校花^ ~^</p>
                            <a href="https://www.linkedin.com/in/bo-zhou-a64a5b122/" class="card-link">商业合作请联系独家经纪人 Dr. Zhou 谢谢合作！</a><br />
                        </div>
                    </div>
                </div>
</body>

</html>