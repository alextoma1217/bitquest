<?php 
    session_start();    
    $score = $_POST["score"];
    // bd call
    try
    {
        //$bdd = new PDO('mysql:host=localhost;dbname=id16771880_running_db;charset=utf8','id16771880_running_user','>ojGza4BU!}ba)}P' );
         $bdd = new PDO('mysql:host=localhost;dbname=running;charset=utf8','root','' );
    }
    catch(Exception $e)
    {
            die('Erreur : '.$e->getMessage());
    }
    
    $reponse = $bdd->query('SELECT `email`,`score` FROM `players` ');
    while($don=$reponse->fetch()){
        if($don["score"]<$score && $don["email"] == $_SESSION["email"]){
            $sql = "UPDATE players  SET score = :score WHERE email= :email";
            $stmt = $bdd->prepare($sql);
            $stmt->bindValue(':score',$score,PDO::PARAM_STR);
            $stmt->bindValue(':email',$_SESSION["email"],PDO::PARAM_STR);
            $stmt->execute();
        }
    }
    if($score > $_SESSION["score"]=$score){
        $_SESSION["score"]=$score;
    }
    header("Loation:../play.php")
?>