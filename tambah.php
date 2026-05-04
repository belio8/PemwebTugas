<?php
require 'database.php';
$nama = mysqli_real_escape_string($conn,$_POST['name']);
$email = mysqli_real_escape_string($conn,$_POST['email']);
$telephone = mysqli_real_escape_string($conn,$_POST['telephone']);
$comment = mysqli_real_escape_string($conn,$_POST['feedback']);

$sql = "INSERT INTO form (name, email, telephone, comment)
VALUES('$nama','$email','$telephone','$comment')";


$save = mysqli_query($conn,$sql);
?>