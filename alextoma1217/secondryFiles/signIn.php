<?php
    session_start();
    $email=$_POST["email"];
    $password=$_POST["password"];

        // bd call
        try
        {
            // $bdd = new PDO('mysql:host=localhost;dbname=id16771880_running_db;charset=utf8','id16771880_running_user','>ojGza4BU!}ba)}P' );
             $bdd = new PDO('mysql:host=localhost;dbname=running;charset=utf8','root','' );
        }
        catch(Exception $e)
        {
                die('Erreur : '.$e->getMessage());
        }
        $login=false;
        $reponse = $bdd->query('SELECT `email`,`password`, `username`,`score` FROM `players` ');
        while($don=$reponse->fetch()){
            if(strtoupper($email)==strtoupper($don['email']) && hash('ripemd160', $password)==$don['password']){
                $login=true ;
               // $_SESSION["name"]=$don["name"];
                $_SESSION["email"]=$email;
                $_SESSION["username"]=$don['username'];
                $_SESSION['score']=$don['score'];
            }
        }
        if($login==true){
            $_SESSION["etat"]="online";
            header("Location:../play.php");
        }
        else{
            $_SESSION["etat"]="offline";
            header("Location:../login.php");
        }
?>