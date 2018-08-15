<?php
include("konektujMe.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    die();
}
 
function checkIfUserExists($username)
{
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE username=?");
    $result->bind_param("s", $username);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if ($num_rows > 0) {
        return true;
    } else {
        return false;
    }
}


function registrujMe($username, $password, $firstname, $lastname, $admin){
    global $conn;
    $rarray = array();
    $errors = "";
    if(checkIfUserExists($username)){
    $errors .= "Korisničko ime je već zauzeto, molimo vas izaberite neko drugo!\r\n";
    }
    if(strlen($username) < 5){
    $errors .= "Korisnicko ime mora imati najmanje 5 karaktera!\r\n";
    }
    if(strlen($password) < 5){
    $errors .= "Lozinka mora imati najmanje 6 karaktera!\r\n";
    }
    if(strlen($firstname) < 3){
    $errors .= "Ime mora imati najmanje 3 karaktera!\r\n";
    }
    if(strlen($lastname) < 2){
    $errors .= "Prezime mora imati najmanje 2 karaktera!\r\n";
    }
    if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, password, admin) VALUES (?, ?, ?, ?, ?)");
        $pass =md5($password);
        $stmt->bind_param("ssssi", $firstname, $lastname, $username, $pass, $admin);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
            $result2->bind_param("ss",$id,$username);
            $result2->execute();
            $rarray['token'] = $id;
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    return json_encode($rarray);
}
function getUsers(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){ 
        
                            
        $result = $conn->query("SELECT id, firstname, lastname, username, admin from users");
      
        $num_rows = $result->num_rows;
        
        $users = array();
        if($num_rows > 0)
        {                         
            $result2 = $conn->query("SELECT id, firstname, lastname, username, admin from users");
           
            while($row = $result2->fetch_assoc()) {
                $one_user = array();
                $one_user['id'] = $row['id'];
                $one_user['firstname'] = $row['firstname'];
                $one_user['lastname'] = $row['lastname'];
                $one_user['username'] = $row['username'];
                $one_user['admin'] = $row['admin'];
                
                array_push($users,$one_user);
            }
        }
        $rarray['users'] = $users;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function getCvece()
{
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM cvet");
    $num_rows = $result->num_rows;
    $cvece = array();
    if ($num_rows > 0) {
        $result2 = $conn->query("SELECT `naziv`,`cena`,`opis` FROM cvet");
        while ($row = $result2->fetch_assoc()) {
            $one_cvet = array();
            $one_cvet['naziv'] = $row['naziv'];
            $one_cvet['cena'] = $row['cena'];
            $one_cvet['opis'] = $row['opis'];
            array_push($cvece,$one_cvet);            
        }
        }else{
            $rarray['error'] = "Please log in";
            header('HTTP/1.1 401 Unauthorized');
            return json_encode($rarray);
        }
        $rarray['cvece'] = $cvece;
        return json_encode($rarray);
} 

function prijaviMe($username, $password){
    global $conn;
    $rarray = array();
    if(checkLogin($username,$password)){
        $id = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
        $result2->bind_param("ss",$id,$username);
        $result2->execute();

        $rarray['token'] = $id;

        $admin = checkIsAdmin($id);
        $rarray['admin'] = $admin;

    } else{
        header('HTTP/1.1 401 Unauthorized');
        $rarray['error'] = "Invalid username/password";
    }
    return json_encode($rarray);
}



function checkIsAdmin($token) {
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT admin FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $admin = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $admin = $row['admin'];
        }
        return $admin;
    }
}


function checkLogin($username, $password){
    global $conn;
    $password = md5($password);
    $result = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $result->bind_param("ss",$username,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM users WHERE token=?");
        $result->bind_param("s",$token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
         if($num_rows > 0)
        {
            return true;
        }
         else{
             return false;
         }
    }
    
   
}

function deleteCvetTip($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){

        $result = $conn->query("SELECT cvet_tip_id FROM cvet WHERE cvet_tip_id=".$id);
        $num_rows = $result->num_rows;
        
        if($num_rows > 0){
             $rarray['error'] = "Postoji cvet sa ovim tipom";
        }else{
        $result2 = $conn->prepare("DELETE FROM cvet_tip WHERE id=?");
        $result2->bind_param("i",$id);
        $result2->execute();
        $rarray['success'] = "Deleted successfully";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}



function getName($token) {
    // $token = str_replace('"', "", $token);
     global $conn;
     $rarray=array();
     $query = 'SELECT username FROM users WHERE token = ?';
     $result = $conn->prepare($query);
     $result->bind_param('s', $token);
   
     $username=array();
     if ($result->execute()) {
         $result = $result->get_result();
         while ($row = $result->fetch_assoc()) {
             $one = array();
             $one['username'] = $row['username']; //vraca {usename:vrednost}
             //username = $row['username']; //vraca samo vrednost
             $username=$one;
         }
         $rarray['username'] = $username;
         return json_encode($rarray);
     }
 }


function proveriAdmina($token) {
                                                                                        
    $rarray=array();
 
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT admin FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $admin = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $admin['admin'] = $row['admin'];
        }
      
       $rarray['admin'] = $admin;
    }

        return json_encode($rarray);
   
}


function addCvet($sifra, $naziv, $cena, $opis, $cvet_tip_id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn() ){
        $stmt = $conn->prepare("INSERT INTO cvet (sifra, naziv, cena, opis, cvet_tip_id) VALUES (?,
        ?, ?, ?, ?)");
        $stmt->bind_param("dsdsd",$sifra, $naziv, $cena, $opis, $cvet_tip_id);
        if($stmt->execute()){
            $rarray['success'] = "ok";
        }else{
            $rarray['error'] = "Database connection error";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}


function addcvettip($tip){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $stmt = $conn->prepare("INSERT INTO cvet_tip (tip) VALUES (?)");
        $stmt->bind_param("s", $tip);
        if($stmt->execute()){
            $rarray['success'] = "ok";
        }else{
            $rarray['error'] = "Database connection error";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}

function getcvettip(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT * FROM cvet_tip");
        $num_rows = $result->num_rows;
        $cvet_tipovi = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT * FROM cvet_tip");
            while($row = $result2->fetch_assoc()) {
                $cvet = array();
                $cvet['id'] = $row['id'];
                $cvet['tip'] = $row['tip'];
                array_push($cvet_tipovi,$cvet);
            }
        }
        $rarray['cvet_tipovi'] = $cvet_tipovi;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}
?>