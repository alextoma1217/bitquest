<html>
    <head>
        <title>The Running Game</title>
        <link rel="stylesheet" href="index.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="short icon" href="media/run/spr_ch1_run_0.png">
        <link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    </head>
    <body>
        <div id="full-area">
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
            <div id="login-form">
                <h1> THE RUNNING GAME</h1>
                <form id="login" action="secondryFiles/signIn.php" method="POST">
                    <div class="btn input" >
                        <input type="email" name="email" placeholder="Email" required autocomplete="off" spellcheck="false"><br>
                    </div>
                    <div class="btn input">
                        <input type="password" name="password" placeholder="Password" required autocomplete="off" spellcheck="false"><br>
                    </div>
                    <button class="btn">LOG IN</button><br>
                    <p>OR</p>
                    <div class="btn" onclick="get_create()">CREATE AN ACCOUNT</div>
                </form>
                <form id="create" action="secondryFiles/createAccount.php" method="POST" style="display: none;">
                    <div class="btn input" >
                        <input type="text" name="username" placeholder="Username" required autocomplete="off" spellcheck="false"><br>
                    </div>
                    <div class="btn input" >
                        <input type="email" name="email" placeholder="Email" required autocomplete="off" spellcheck="false"><br>
                    </div>
                    <div class="btn input">
                        <input type="password" name="password" placeholder="Password" required autocomplete="off" spellcheck="false"><br>
                    </div>
                    <button class="btn">CREATE AN ACCOUNT</button><br>
                    <p>OR</p>
                    <div class="btn" onclick="get_login()">LOG IN</div>
                </form>
                
            </div>
        </div>
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
        <script src="index.js"></script>
    </body>
</html>