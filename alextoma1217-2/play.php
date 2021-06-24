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

    $reponse = $bdd->query('SELECT `email`,`diam`,`heart` FROM `players` ');
    while($don=$reponse->fetch()){
        if($don["email"] == $_SESSION["email"]){
            $diam =$don['diam'];
            $heart = $don["heart"];
        }
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
            <img src="media/main_run.gif" alt="">
            <img src="media/main_jump_up.png" alt="">
            <img src="media/main_jump_down.png" alt="">
            <img src="media/main_idle.png" alt="">
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
            <div id="speeding-msg" style="font-size:20px;font-weight:bold;position:absolute;top:50%;text-align:center;width:100%;margin-top:140px;user-select:none;display:none;">SPEEDING UP...</div>
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
                <div class="btn" id="play-btn" >
                   PLAY
                    <span class="material-icons">help </span>
                    <div id="triangle-up"></div>
                    <p class="btn">
                        HOW TO PLAY:<br>
                        - JUMP : SPACE BUTTON / ARROW TOP BUTTON<br>
                        - ATTACK : S BUTTON / ARROW RIGHT BUTTON<br>
                        INVENTORY:<br>
                        - DIAMOND : USED ON THE SHOP<br>
                        - HEART : USED TO GET A NEW CHANCE AFTER DYING
                    </p>
                </div><br>
                <div class="btn" id="leaderboard-btn">LEADERBOARD</div><br>
                <div class="btn" id="shop-btn">SHOP</div><br>
                <div class="btn logout" onclick="location.href='secondryFiles/logout.php'" >LOGOUT</div>
            </div>
            <div id="gameplay" >
            <div id="shop-heart"><p><?php echo($heart)?></p><span class="material-icons">favorite</span></div>
            <div id="shop-diam"><p><?php echo($diam)?></p><img src="media/diam.png" alt=""></div>
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
                    <div id="gameplay-chance">
                        <p>DO YOU WANT TO USE ONE HEART TO CONTINUE?</p>
                        <div id="gameplay-chance-yes" class="btn">YES [1]</div>
                        <div id="gameplay-chance-no" class="btn">NO [2]</div>
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
            <div id="shop">
            <div id="shop-close" class="material-icons">close</div>
            <div id="shop-heart"><p><?php echo($heart)?></p><span class="material-icons">favorite</span></div>
            <div id="shop-diam"><p><?php echo($diam)?></p><img src="media/diam.png" alt=""></div>
            <div id="shop-btns">
                <div id="character-btn" class="btn">Characters (Coming Soon)</div>
                <div id="heart-btn" class="btn">
                    Buy Heart<br>
                    <span class="material-icons">favorite</span>
                    <div id="heart-price"><p>20</p><img src="media/diam.png" alt=""></div>
                </div>
            </div>
            <div id="shop-text">You bought 1 Heart!</div>
            </div>
        </div>
        <script>
            let heart_availability = true;
            let best_score =<?php echo json_encode($_SESSION["score"]); ?>;
            let db_diam =<?php echo json_encode($diam); ?>;
            let db_heart =<?php echo json_encode($heart); ?>;
            if(db_heart>0){
                 heart_availability = true;
            }
            else{
                 heart_availability = false;
            }
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