<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST');
    include("funkcije.php");
    if(isset($_POST['username']) &&
        isset($_POST['password'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        echo prijaviMe($username,$password);
    }
?>