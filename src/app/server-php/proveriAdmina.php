<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

include("funkcije.php");

if (isset($_POST['token']) ){

  $token = $_POST['token'];
 // $admin = intval($_POST['admin']);
  

  echo proveriAdmina($token);

}
?>