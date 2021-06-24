<?php 
    session_start();    
    $heart = $_POST["heart"];
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
    
    $reponse = $bdd->query('SELECT `email`,`heart` FROM `players` ');
    while($don=$reponse->fetch()){
        if($don["email"] == $_SESSION["email"]){
            $heart = $don["heart"]-1;
            $sql = "UPDATE players  SET heart = :heart WHERE email= :email";
            $stmt = $bdd->prepare($sql);
            $stmt->bindValue(':heart',$heart,PDO::PARAM_STR);
            $stmt->bindValue(':email',$_SESSION["email"],PDO::PARAM_STR);
            $stmt->execute();
        }
    }
?>