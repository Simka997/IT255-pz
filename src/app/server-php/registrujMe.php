<?php
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

include("funkcije.php");

if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['admin'])){

    $firstname = $_POST['firstName'];
    $lastname = $_POST['lastName'];
    $username = $_POST['username'];
    $password = ($_POST['password']);
    $admin = ($_POST['admin']);
  
    echo registrujMe($username,$password,$firstname,$lastname,$admin);
   
  
  }
?>
