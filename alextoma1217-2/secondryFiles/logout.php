<?php
    session_start();
    $_SESSION["etat"]="offline";
    header("Location:../login.php");
?>