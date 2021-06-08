
// Generate random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Variables 
let game= false;
let boss = false;
let jump_more = false
let boss_mouvement = false
let boss_level = 1;
let boss_health = 100;
let birds = []
let obstacle=[]
let bullets=[]
let run_cycle = 0
let pos_top = 0;
let jump_etat = 0
let score = 0
let character_etat = "running"
let run_loop
let jump_loop
let score_loop
let obstacle_add_loop
let boss_add_out
let obstacle_move_loop
let bullets_move_loop
let bird_move_loop
let dead_loop
let obstacle_time
let diam=0;
let obstacle_add_loop2
let bullets_pos
let obstacle_pos
// RUN FUCNTION
let run = function(){
    if(character_etat=="running"){
        clearInterval(jump)
        if (run_cycle != 4){
            $("#character").css({"background":"url('media/run/spr_ch1_run_"+run_cycle+".png')","background-size":"cover"})
            run_cycle++
        }
        else{
            run_cycle = 0
        }
    }
}
// JUMP FUNCTION
let jump = function(){
    if(character_etat=="jumping"){
        if (jump_more == true){
            jump_audio()
        }
        //$("#character").css({"background":"url('media/spr_ch1_jump_0.png')","background-size":"cover"})
        if(jump_etat==1){
            if (pos_top<=-85 && pos_top>-120){
                pos_top-=5
                $("#character").css({"top":""+pos_top+"px"})
            }
            else if (pos_top<=-45 && pos_top>-85){
                pos_top-=10
                $("#character").css({"top":""+pos_top+"px"})
            }
            else if (pos_top == -120){
                jump_etat = 2
            }
            else {
                pos_top-=15
                $("#character").css({"top":""+pos_top+"px"})
            }
        }
        else if(jump_etat == 2){
            
            if (pos_top>=-120 && pos_top<-85){
                pos_top+=5
                $("#character").css({"top":""+pos_top+"px"})
            }
            else if (pos_top<-45 && pos_top>=-85){
                pos_top+=10
                $("#character").css({"top":""+pos_top+"px"})
                if( boss_mouvement == true && $(".boss").length && pos_top<-45 && pos_top>=-65){
                    if( $(".boss").position().left < 100){
                        jump_etat = 1;
                    }
                }
            }
            else if (pos_top >= 0){
                if(jump_more ==false){
                    jump_etat = 0 
                    character_etat="running"
                }
                else{
                    jump_more = false
                    jump_etat = 1
                }
            }
            else {
                pos_top+=15
                $("#character").css({"top":""+pos_top+"px"})
            }
        }
    }
}
// OBSTACLE.ADD FUNCTION
let type_obstacle
let bird_top_values;
let bird_top_values_random;
let obstacle_add = function(){
    obstacle_time_values = [150,600,700,700,650,750,700,750,825,850,850,875,900,925,850,900,1000]
    clearInterval(obstacle_add_loop)
    do{
        random_obstacle_time = getRandomInt(16)
    }
    while (obstacle_time == obstacle_time_values[random_obstacle_time] && obstacle_time==150)
    obstacle_time = obstacle_time_values[random_obstacle_time]

    type_obstacle = getRandomInt(16)
    if(type_obstacle>=0 && type_obstacle<8){
        $("#obstacles").append("<div class='little1'></div>")
    }
    else if(type_obstacle>=8 && type_obstacle<10){
        bird_top_values = [-100,-90,-80,-70,-60,-50,-40,-30,-20,-10,0]
        bird_top_values_random = getRandomInt(10)
        $("#obstacles").append("<div class='bird' style='top:"+bird_top_values[bird_top_values_random]+"px'></div>")
        $("#obstacles").append("<div class='little1'></div>")
        birds[birds.length]={
            position:00,
        }
        obstacle[obstacle.length]={
            position:00,
        }
        
    }
    else if(type_obstacle>=10 && type_obstacle<15){
        $("#obstacles").append("<div class='big'></div>")
    }
    else if(type_obstacle==15){
        $("#obstacles").append("<div class='diam'></div>")
    }
    obstacle[obstacle.length]={
        position:00,
    }
    
    obstacle_add_loop2 = setTimeout(()=>{ obstacle_add() },obstacle_time)
}
// OBSTACLE.MOVE FUNCTION
let fire_top;
let obstacle_move = function(){
        for(i=0;i<=obstacle.length;i++){
        if($("#obstacles").children().eq(i).hasClass('bird')==false){
            if($("#obstacles").children().eq(i).length){
                obstacle_pos=$("#obstacles").children().eq(i).position().left
                fire_top = $("#obstacles").children().eq(i).position().top
            }
            if(obstacle_pos>-165){
                if($("#obstacles").children().eq(i).hasClass('boss') && boss_mouvement == true){
                    obstacle_pos=obstacle_pos-20
                    $("#obstacles").children().eq(i).css({"left":""+obstacle_pos+"px"})
                }
                else if ($("#obstacles").children().eq(i).hasClass('boss') == false){
                    obstacle_pos=obstacle_pos-5
                    if($("#obstacles").children().eq(i).hasClass('fire') && $("#obstacles").children().eq(i).length){ // FIRE
                        fire_top = fire_top + 15.95
                        $("#obstacles").children().eq(i).css({"left":""+obstacle_pos+"px","top":""+fire_top+"px"})
                    }
                    else{ // NOT FIRE
                        $("#obstacles").children().eq(i).css({"left":""+obstacle_pos+"px"})
                    }
                }
            }
            else{
                if($("#obstacles").children().eq(i).hasClass('boss')){
                    boss_health = boss_health - 20
                    boss_level++
                    $("#boss-bar div").css({"width":""+boss_health+"%","transition":"0.3s","transition-timing-function":"linear"})
                    if(boss_level < 6){
                        boss_attack()
                    }
                    else{
                        clearInterval(obstacle_move_loop)
                        $("#boss-bar").hide()
                        boss_health = 100
                        boss = false
                        boss_level = 1
                        run_loop = setInterval(()=>{ run(); bird_dead() },50)
                        score_loop = setInterval(()=>{ score_add(); bird_dead() },70)
                        dead_loop = setInterval(()=>{ bird_dead()},0)
                        bullets_move_loop = setInterval(()=>{ bullets_move() ; bird_dead()},20)
                        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},10)
                        $("#obstacles").children().hide()
                        $("#bullets").children().hide()
                        obstacle = []
                        birds = []
                        bullets = []
                        setTimeout(()=>{
                            obstacle_add()
                            obstacle_add_loop = setInterval(()=>{ obstacle_add(); bird_dead() },obstacle_time)
                            obstacle_move_loop = setInterval(()=>{ obstacle_move() ; bird_dead()},12)
                        },500)
                    }
                }
                if($("#obstacles").children().eq(i).hasClass('bird')){
                    birds.splice(i, 1)
                }
                $("#obstacles").children().eq(i).remove()
                //$("#obstacles").children().eq(i).css({"margin-left":"1px"})
                obstacle.splice(i, 1)
            }
            // loose condition 
                if((  obstacle_pos> -5 && obstacle_pos<45 && pos_top>-50 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("little1") || $("#obstacles").children().eq(i).hasClass("little2"))){
                    death_audio()
                    over()
                }
                else if((  obstacle_pos> -30 && obstacle_pos<45 && pos_top>-50 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("big"))){
                    death_audio()
                    over()
                }
                else if((  obstacle_pos> -5 && obstacle_pos<40 && pos_top<-50 && pos_top>-110 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("bird"))){
                    death_audio()
                    over()
                }
                // GET DIAM
                else if((  obstacle_pos> -20 && obstacle_pos<45 && pos_top>-50 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("diam"))){
                    diam_audio()
                    diam++;
                    $("#obstacles").children().eq(i).remove()
                    obstacle.splice(i, 1)
                    
                }
                // FIRE
                else if((  obstacle_pos> -30 && obstacle_pos<15 && pos_top>-30  && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("fire"))){
                    death_audio()
                    over()
                }
                // BOSS MOVE
                else if((  obstacle_pos> -5 && obstacle_pos<15 && pos_top>-30  && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("boss"))){
                    death_audio()
                    over()
                }
        }
    }
}
// BIRDS MOVE
let bird_pos
let bird_move = function(){
        for(i=0;i<=obstacle.length;i++){
            if($("#obstacles").children().eq(i).hasClass('bird')==true){
            if($("#obstacles").children().eq(i).length){
                obstacle_pos=$("#obstacles").children().eq(i).position().left
            }
            if(obstacle_pos>-65){
                    obstacle_pos=obstacle_pos-5
                $("#obstacles").children().eq(i).css({"left":""+obstacle_pos+"px"})
            }
            else{
                if($("#obstacles").children().eq(i).hasClass('bird')){
                    birds.splice(i, 1)
                }
                $("#obstacles").children().eq(i).remove()
                //$("#obstacles").children().eq(i).css({"margin-left":"1px"})
                obstacle.splice(i, 1)
            }
            // loose condition 
                if((  obstacle_pos> -5 && obstacle_pos<45 && pos_top>-50 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("little1") || $("#obstacles").children().eq(i).hasClass("little2"))){
                    death_audio()
                    over()
                }
                else if((  obstacle_pos> -30 && obstacle_pos<45 && pos_top>-50 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("big"))){
                    death_audio()
                    over()
                }
                // DEAD FROM BIRD
                else if((  obstacle_pos> -10 && obstacle_pos<40 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("bird"))){
                    if(pos_top< $("#obstacles").children().eq(i).position().top +20 && pos_top>$("#obstacles").children().eq(i).position().top - 55){
                        death_audio()
                        over()
                    }
                }
                // GET DIAM
                else if((  obstacle_pos> -20 && obstacle_pos<45 && pos_top>-50 && $("#obstacles").children().length) && ($("#obstacles").children().eq(i).hasClass("diam"))){
                    diam_audio()
                    diam++;
                    $("#obstacles").children().eq(i).remove()
                    obstacle.splice(i, 1)
                    
                }
        }
    }
}
// ADD BULLET
let bullet_add = function(){
    $("#bullets").append("<div style='top:"+pos_top+"px'></div>")
    bullets[bullets.length]={
        position:00,
    }
}
// BULLET MOVE
let obstacle_pos_compa
let bullets_move = function(){
    for(i=0;i<=bullets.length;i++){
        if($("#bullets").children().eq(i).length){
            bullets_pos=$("#bullets").children().eq(i).position().left
        }
        if(bullets_pos<900){
            bullets_pos=bullets_pos+5
            $("#bullets").children().eq(i).css({"left":""+bullets_pos+"px"})
        }
        else{
            $("#bullets").children().eq(i).remove()
            //$("#bullets").children().eq(i).css({"margin-left":"1px"})
            bullets.splice(i, 1)
        }
        // IF it touch an obstacle 

    }
}

let bird_dead = function(){
    //$("#test").html("Bullets : "+bullets.length+" <br>Birds : "+birds.length+"")
    for(j=0;j<bullets.length;j++){
            for(i=0;i<birds.length;i++){
                if($("#bullets").children().eq(j).length && $(".bird").eq(i).length){
                    if(($("#bullets").children().eq(j).position().left  + 40) == $(".bird").eq(i).position().left && $("#bullets").children().eq(j).position().top <= $(".bird").eq(i).position().top +20 && $("#bullets").children().eq(j).position().top>=  $(".bird").eq(i).position().top - 45 ){
                        $(".bird").eq(i).remove()
                        $("#bullets").children().eq(j).remove()
                       bullets_pos = 0
                       bullets.splice(j, 1)
                       birds.splice(i, 1)
                    }
                }
            }
    }
}

let boss_add = function(){
    clearInterval(obstacle_add_loop)
    clearInterval(obstacle_add_loop2)
    let boss_add_out = setTimeout(()=>{
    if(game==true){
        boss = true
        clearInterval(obstacle_move_loop)
        clearInterval(run_loop)
        clearInterval(score_loop)
        clearInterval(dead_loop)
        clearInterval(bullets_move_loop)
        clearInterval(bird_move_loop)
        $("#obstacles").children().remove()
        $("#bullets").children().remove()
        $("#boss-bar").fadeIn()
            boss_attack()
    }
    },2100)
}

let boss_attack = function(){
    // fire ball
        $("#obstacles").append("<div class='boss' style='display:none'></div>")
        $(".boss").fadeIn()
        roar_audio()
        $(".boss").css({"left":"650px","transition":"1s","transition-timing-function":"linear"})
        boss_mouvement = false
        clearInterval(obstacle_move_loop)
    setTimeout(()=>{
        if( game == true ){
            boss_attack_fire()
            // Obstacles loop working
            obstacle_move_loop = setInterval(()=>{ obstacle_move()},32)
            // First dragon move to character
            // LEVEL 1
            if(boss_level == 1){
                setTimeout(()=>{
                    if( game == true ){
                        $(".boss").css({"margin-top":"120px","transition":"0.2s","transition-timing-function":"linear"})
                        setTimeout(()=>{
                            boss_mouvement = true
                            $(".boss").css({"background":"url('media/boss_move.png')","transition":"0s","transition-timing-function":"linear"})
                        },101)
                    }
                },1500)
            }
            // LEVEL 2
            else if(boss_level == 2){
                setTimeout(()=>{
                    boss_attack_fire()
                },1000)
                setTimeout(()=>{
                    if( game == true ){
                        $(".boss").css({"margin-top":"120px","transition":"0.2s","transition-timing-function":"linear"})
                        setTimeout(()=>{
                            boss_mouvement = true
                            $(".boss").css({"background":"url('media/boss_move.png')","transition":"0s","transition-timing-function":"linear"})
                        },201)
                    }
                },2000)
            }
            // LEVEL 3
            else if(boss_level == 3){
                setTimeout(()=>{
                    boss_attack_fire()
                },800)
                setTimeout(()=>{
                    boss_attack_fire()
                },1600)
                setTimeout(()=>{
                    if( game == true ){
                        $(".boss").css({"margin-top":"120px","transition":"0.2s","transition-timing-function":"linear"})
                        setTimeout(()=>{
                            boss_mouvement = true
                            $(".boss").css({"background":"url('media/boss_move.png')","transition":"0s","transition-timing-function":"linear"})
                        },301)
                    }
                },2100)
            }
            // LEVEL 4
            else if(boss_level == 4){
                setTimeout(()=>{
                    boss_attack_fire()
                },600)
                setTimeout(()=>{
                    boss_attack_fire()
                },1200)
                setTimeout(()=>{
                    boss_attack_fire()
                },1800)
                setTimeout(()=>{
                    if( game == true ){
                        $(".boss").css({"margin-top":"120px","transition":"0.2s","transition-timing-function":"linear"})
                        setTimeout(()=>{
                            boss_mouvement = true
                            $(".boss").css({"background":"url('media/boss_move.png')","transition":"0s","transition-timing-function":"linear"})
                        },401)
                    }
                },2400)
            }
            // LEVEL 5
            else if(boss_level == 5){
                setTimeout(()=>{
                    boss_attack_fire()
                },500)
                setTimeout(()=>{
                    boss_attack_fire()
                },1000)
                setTimeout(()=>{
                    boss_attack_fire()
                },1500)
                setTimeout(()=>{
                    boss_attack_fire()
                },2000)
                setTimeout(()=>{
                    if( game == true ){
                        $(".boss").css({"margin-top":"120px","transition":"0.2s","transition-timing-function":"linear"})
                        setTimeout(()=>{
                            boss_mouvement = true
                            $(".boss").css({"background":"url('media/boss_move.png')","transition":"0s","transition-timing-function":"linear"})
                        },501)
                    }
                },2600)
            }
        }
    },2000)
}

let boss_attack_fire = function(){
    $(".boss").css({"background":"url('media/boss_spit.png')","transition":"0s","transition-timing-function":"linear"})
    setTimeout(()=>{
        $("#obstacles").append("<div class='fire'></div>")
        fire_audio()
            obstacle[obstacle.length]={
            position:00,
            }
            setTimeout(()=>{
                $(".boss").css({"background":"url('media/boss_idle.gif')","transition":"0s","transition-timing-function":"linear"})
            },200)
    },100)
}
let boss_attack_move = function(){
    boss_mouvement = true;
}
let score_add = function(){
    score++
    if ( score < 10){
        $("#score").html("0000"+score)
    }
    else if ( score < 100){
        $("#score").html("000"+score)
    }
    else if ( score < 1000){
        $("#score").html("00"+score)
    }
    else if ( score < 10000){
        $("#score").html("0"+score)
    }
    else{
        $("#score").html(score)
    }

    if( score == 10 ){
        clearInterval(obstacle_move_loop)
        obstacle_move_loop = setInterval(()=>{ obstacle_move() },11)
        clearInterval(bird_move_loop)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},9)
    }
    else if ( score == 500){
        clearInterval(obstacle_move_loop)
        obstacle_move_loop = setInterval(()=>{ obstacle_move() },10)
        clearInterval(bird_move_loop)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},8)
    }
    else if ( score == 750){
        clearInterval(obstacle_move_loop)
        obstacle_move_loop = setInterval(()=>{ obstacle_move() },9)
        clearInterval(bird_move_loop)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},7)
    }
    else if ( score == 1000){
        clearInterval(obstacle_move_loop)
        obstacle_move_loop = setInterval(()=>{ obstacle_move() },8)
        clearInterval(bird_move_loop)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},6)
    }
    else if ( score == 2000){
        clearInterval(obstacle_move_loop)
        obstacle_move_loop = setInterval(()=>{ obstacle_move() },7)
        clearInterval(bird_move_loop)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},5)
    }
    else if ( score == 3000){
        clearInterval(obstacle_move_loop)
        obstacle_move_loop = setInterval(()=>{ obstacle_move() },6)
        clearInterval(bird_move_loop)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},4)
    }
    else if ( score == 4000){
        boss_add()
    }
}
let start = function(){
    game=true
    character_etat="running"
    score = 0;
    diam = 0;
    jump_etat=0
    bullets = []
    obstacle = []
    birds = []
    boss_mouvement = false
    boss_level = 1;
    boss_health = 100;
    $("#boss-bar div").css({"width":"101%"})
    // Opera + Chrome + Edge
        run_loop = setInterval(()=>{ run(); bird_dead() },50)
        jump_loop = setInterval(()=>{ jump(); bird_dead() },22) 
        score_loop = setInterval(()=>{ score_add(); bird_dead() },70)
        dead_loop = setInterval(()=>{ bird_dead()},0)
        bullets_move_loop = setInterval(()=>{ bullets_move() ; bird_dead()},20)
        bird_move_loop = setInterval(()=>{bird_move();bird_dead()},10)
        setTimeout(()=>{
            obstacle_add()
            obstacle_add_loop = setInterval(()=>{ obstacle_add(); bird_dead() },obstacle_time)
            obstacle_move_loop = setInterval(()=>{ obstacle_move() ; bird_dead()},12)
        },500)
    $("#score").html("00000")
    $("#obstacles").children().remove()
    $("#character").css({"background":"url('media/run/spr_ch1_run_0.png')","background-size":"cover"})
    $("#character").css({"top":"0px"})
    $("#game-over").hide()
    $("#gameplay-start").hide()
    $("#bullets").children().remove()
    $("#boss-bar").hide()
}

// GAME OVER
let over = function(){
    game=false
    boss=false
    $("#boss-bar").hide()
    clearInterval(obstacle_add_loop)
    clearInterval(obstacle_move_loop)
    clearInterval(obstacle_add_loop2)
    clearInterval(run_loop)
    clearInterval(jump_loop)
    clearInterval(score_loop)
    clearInterval(dead_loop)
    clearInterval(bullets_move_loop)
    clearInterval(bird_move_loop)
    clearTimeout(boss_add_out)
    $("#game-over").fadeIn()
    
    if(score > best_score){
        $.ajax({
            type: "POST",
            url: 'secondryFiles/score.php',
            data: { score: score},
            success: function(data){
                best_score = score;
            } 
        });
    }
}





