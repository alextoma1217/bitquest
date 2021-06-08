<?php
    session_start();
    if($_SESSION['etat']!="online" ){
        $_SESSION['etat']="offline";
        header("Location:login.php");
    }

    // bd call
    try
    {
        $bdd = new PDO('mysql:host=localhost;dbname=id16771880_running_db;charset=utf8','id16771880_running_user','>ojGza4BU!}ba)}P' );
        //$bdd = new PDO('mysql:host=localhost;dbname=running;charset=utf8','root','' );
    }
    catch(Exception $e)
    {
            die('Erreur : '.$e->getMessage());
    }
?>
<html>
    <head>
        <title>The Running Game</title>
        <link rel="stylesheet" href="index.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="short icon" href="media/run/spr_ch1_run_0.png">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet' type='text/css'>
        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    </head>
    <body>
        <div id="sprites" style="display: none;">
            <img src="media/spr_ch1_idle_0.png" alt="">
            <img src="media/run/spr_ch1_run_0.png" alt="">
            <img src="media/run/spr_ch1_run_1.png" alt="">
            <img src="media/run/spr_ch1_run_2.png" alt="">
            <img src="media/run/spr_ch1_run_3.png" alt="">
            <img src="media/run/spr_ch1_run_4.png" alt="">
            <img src="media/spr_ch1_jump_0.png" alt="">
            <img src="media/little1.png" alt="">
            <img src="media/big.png" alt="">
            <img src="media/little2.png" alt="">
            <img src="media/diam.png" alt="">
            <img src="media/bullet.png" alt="">
            <img src="media/dragon.png" alt="">
            <img src="media/boss_idle.gif" alt="">
            <img src="media/boss_move.png" alt="">
            <img src="media/boss_spit.png" alt="">
            <img src="media/fire.png" alt="">
        </div>
        <audio id="jump-audio">
            <source src="media/jump.mp3" type="audio/mp3" > <!-- Button click -->
        </audio>
        <audio id="death-audio">
            <source src="media/death.mp3" type="audio/mp3" > <!-- Button click -->
        </audio>
        <audio id="diam-audio">
            <source src="media/diam.mp3" type="audio/mp3" > <!-- Button click -->
        </audio>
        <audio id="fire-audio">
            <source src="media/fire.wav" type="audio/mp3" > <!-- Button click -->
        </audio>
        <audio id="roar-audio">
            <source src="media/roar.mp3" type="audio/mp3" > <!-- Button click -->
        </audio>
        <div id="full-area">
        <div id="test" style="position: absolute;font-size:20px;font-weight:bold;width: 100%;text-align:center">
        
        </div>
            <div id="unsupported-browsers" style="display: none;position:relative;top:50%;">
                <h1>Sorry, Your browser is not supported!</h1>
                <h3 style="user-select: none;font-weight:bold;">Please try one of our supported browsers below:
                <br> (Google Chrome, Opera, Microsoft Edge)
                </h3>
                <div id="browsers-pictures" style="margin-top: 20px;">
                    <img style="width: 60px;" src="media/chrome.png" alt="">
                    <img style="width: 70px;margin-left:8px" src="media/opera.png" alt="">
                    <img style="width: 70px;" src="media/edge.png" alt="">
                </div>
            </div>
            <div id="info" >
                <p>LOGGED AS: <span><?php echo(strtoupper($_SESSION["username"]))?></span></p>
            </div>
            <div id="menu" >
                <h1>BEST SCORE : <?php echo(strtoupper($_SESSION["score"]))?></h1>
                <div class="btn" id="play-btn">PLAY</div><br>
                <div class="btn" id="leaderboard-btn">LEADERBOARD</div><br>
                <div class="btn" id="shop-btn">SHOP (COMING SOON)</div><br>
                <div class="btn logout" onclick="location.href='secondryFiles/logout.php'" >LOGOUT</div>
            </div>
            <div id="gameplay" style="display: none;" >
                <div id="gameplay-back" ><span class="material-icons">chevron_left </span>
                    <p>Back</p></div>
                    <div id="gameplay-start">
                        <p>START</p>
                        <span class="material-icons" onclick="start();">
                            play_arrow
                            </span>
                    </div>
                    <div id="game-over">
                        <p>GAME OVER</p>
                        <span class="material-icons" onclick="start();">
                            repeat_on
                            </span>
                    </div>
                <div id="score">00000</div>
                <div id="character"></div>
                <div id="obstacles"></div>
                <div id="boss-bar"><div>BOSS HEALTH</div></div>
                <div id="bullets"></div>
            </div>
            <div id="leaderboard" style="display: none;">
                <div id="leaderboard-menu">
                    <p>LEADERBOARD</p>
                    <div id="leaderboard-close" class="material-icons">close</div>
                </div>
                <?php
                            $i=0;
                            $reponse = $bdd->query('SELECT `username`,`score` FROM `players` ORDER BY score DESC LIMIT 0,100');
                            while($don=$reponse->fetch()){
                               if($don["score"]!=0){
                                $i++;
                                $score = "";
                                if ($don["score"] <10){ $score = "0000";}
                                else if ($don["score"] <100){ $score = "000";}
                                else if ($don["score"] <1000){ $score = "00";}
                                else if ($don["score"] <10000){ $score = "0";}

                                echo("<div id='player' style='display: flex;'><div id='player-rank'>".$i.".</div><div id='player-name'>".$don["username"]."</div><div id='player-score'>".$score."".$don["score"]."</div></div>");
                               }
                            };
                        ?>
            </div>
        </div>
        <script>
            let best_score =<?php echo json_encode($_SESSION["score"]); ?>;
        </script>
        <script src="detect.js"></script>
        <script>
            var user = detect.parse(navigator.userAgent);
            console.log(
                user.browser.family
            );

            // Unsupported browsers
            if (user.browser.family != "Chrome" && user.browser.family != "Opera"){
                $("#full-area").children().hide()
                $("#unsupported-browsers").show()
            }
        </script>
        <script src="functions.js"></script>
        <script src="index.js"></script>
    </body>
</html>