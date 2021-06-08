// LOGIN PAGE
get_login = function(){
    $("#login").fadeIn()
    $("#create").hide()
}
get_create = function(){
    $("#login").hide()
    $("#create").fadeIn()
}

// POSITION TOP FOR FORM PAGE
let form_top;
let menu_top;
setInterval(()=>{
    form_top = $("#login-form").innerHeight() /2
    menu_top = $("#menu").innerHeight() /2
    browser_top = $("#unsupported-browsers").innerHeight() /2
    $("#login-form").css({"margin-top":""-form_top+"px"})
    $("#menu").css({"margin-top":""-menu_top+"px"})
    $("#unsupported-browsers").css({"margin-top":""-browser_top+"px"})
})

// Get gameplay area
$("#play-btn").click(()=>{
    $("#menu").hide()
    $("#gameplay-start").show()
    $("#gameplay").fadeIn()
})

// Leave gameplay area
$("#gameplay-back").click(()=>{
    over()
        $("#score").html("00000")
        $("#obstacles").children().remove()
        $("#character").css({"background":"url('media/run/spr_ch1_run_0.png')","background-size":"cover"})
        $("#character").css({"top":"0px"})
        $("#game-over").hide()
        setTimeout(()=>{
            location.href='play.php'
        },50)
})

// Get leaderboard
$("#leaderboard-btn").click(()=>{
    $("#menu").hide()
    $("#leaderboard").fadeIn()
})
// Hide leaderboard
$("#leaderboard-close").click(()=>{
    $("#leaderboard").hide()
    $("#menu").fadeIn()
})


// AUDIOS
function jump_audio(){
    $("#jump-audio")[0].play();
}
function death_audio(){
    $("#death-audio")[0].play();
}
function diam_audio(){
    $("#diam-audio")[0].play();
}
function fire_audio(){
    $("#roar-audio")[0].pause()
    $("#fire-audio")[0].pause()
    $("#fire-audio")[0].currentTime = 0
    $("#fire-audio")[0].play();
}
function roar_audio(){
    $("#roar-audio")[0].pause()
    $("#roar-audio")[0].currentTime = 0
    $("#roar-audio")[0].play();
}



// Audio volume
$("#diam-audio").prop("volume", 0.1);
$("#fire-audio").prop("volume", 0.2);
$("#roar-audio").prop("volume", 0.2);

let bullets_availibility = true;
document.addEventListener('keydown', logKey);
function logKey(e){
    if ( e.which==32 || e.which==38){
        if(game == false){
            start()
        }
        if(character_etat=="jumping" && game == true && jump_etat == 2){
            jump_more = true
        }
        if(jump_etat == 0 && game==true){
            jump_audio()
            jump_etat = 1
            character_etat="jumping"
        }
    }
    else if ( e.which==39 || e.which==83){
        
            if(bullets_availibility == true && game == true && boss==false){
                bullet_add()
                bullets_availibility = false
                setTimeout(()=>{
                    bullets_availibility = true
                },500)
            }
       
    }
}




