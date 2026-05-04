<?php

$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'pemwebtes';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to match database
$conn->set_charset("utf8mb4");

// $nama = mysqli_real_escape_string($conn,$_POST['name']);
// $email = mysqli_real_escape_string($conn,$_POST['email']);
// $telephone = mysqli_real_escape_string($conn,$_POST['telephone']);
// $comment = mysqli_real_escape_string($conn,$_POST['feedback']);

// $sql = "INSERT INTO form (name, email, telephone, comment)
// VALUE('$nama','$email','$telephone','$comment')";


// $save = mysqli_query($conn,$sql);
?>