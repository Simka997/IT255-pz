<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

    include("funkcije.php");

if (isset($_POST['sifra']) &&  isset($_POST['naziv']) && isset($_POST['cena']) && isset($_POST['opis'])){
  $sifra = $_POST['sifra'];
  $naziv = $_POST['naziv'];
  $cena = $_POST['cena'];
  $opis = $_POST['opis'];

  if(isset($_POST['cvet_tip_id']) && !empty($_POST['cvet_tip_id'])){
    $cvet_tip_id = intval($_POST['cvet_tip_id']);
} else{
    $cvet_tip_id = null;
}
  echo addCvet($sifra,$naziv,$cena,$opis, $cvet_tip_id);

 // $hasTV = intval($_POST['tv']);
 // $beds = intval($_POST['beds']);

  // $stmt = $conn->prepare("INSERT INTO sobe (broj, naziv, tv, kvadrati, kreveti) VALUES (?, ?, ?, ?, ?)");
  // $stmt->bind_param("dsddd", $broj, $naziv, $tv, $kvadrati, $kreveti);
  // $stmt->execute();
  // echo "ok";
 // header('Location: kontakt.component');
}
?>