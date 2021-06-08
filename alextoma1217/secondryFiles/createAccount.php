<?php
    session_start();
    $new_username=$_POST["username"];
    $new_email=$_POST["email"];
    $new_password=hash('ripemd160', $_POST["password"]);
    $diam =0;
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
    // INSERT
        $error=false;
        $reponse = $bdd->query('SELECT `username`,`email` FROM `players` ');
        while($don=$reponse->fetch()){
            if( strtoupper($new_email)==strtoupper($don['email']) || strtoupper($new_username)==strtoupper($don['username'])){
                $error=true ;
            }
        }
        if($error==false){
            $req=$bdd->prepare('INSERT INTO `players`(`username`, `email`, `diam`,`score`, `password`) 
            VALUES (:username,:email,:diam,:score,:password)');
            $req->execute(array(
                'username' => $new_username,  
                'email'=> $new_email,
                'diam' => 0, 
                'score' => 0, 
                'password' => $new_password, 
            ));
            $_SESSION["etat"]="online";
            $_SESSION["email"]=$new_email;
            $_SESSION["username"]=$new_username;
            $_SESSION["score"]=0;
            header("Location:../play.php");
        }
        else{
            $_SESSION["etat"]="used";
            header("Location:../login.php");
        }
?>