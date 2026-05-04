<?php
require 'database.php';
$sql = "SELECT name, email, telephone, comment, created_at FROM form ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Beritahu browser bahwa ini adalah file JSON
header('Content-Type: application/json');
echo json_encode($data);
?>