<?php
require 'database.php';
$nama = mysqli_real_escape_string($conn,$_POST['name']);
$email = mysqli_real_escape_string($conn,$_POST['email']);
$telephone = mysqli_real_escape_string($conn,$_POST['telephone']);
$comment = mysqli_real_escape_string($conn,$_POST['feedback']);

$sql = "INSERT INTO form (name, email, telephone, comment)
VALUES('$nama','$email','$telephone','$comment')";


$save = mysqli_query($conn,$sql);

if ($save) {
    // Simpan data ke session agar bisa dipanggil di halaman prescript.php
    $_SESSION['user_name'] = $nama;
    $_SESSION['user_email'] = $email;
    $_SESSION['user_tel'] = $telephone;
    $_SESSION['status'] = "Data berhasil disimpan!";
    
    echo "success";
} else {
    echo "error";
}
?>