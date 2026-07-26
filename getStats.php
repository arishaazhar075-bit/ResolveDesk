<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

// total complaints
$total = $conn->query("SELECT COUNT(*) as total FROM complaints")->fetch_assoc();

// pending complaints
$pending = $conn->query("SELECT COUNT(*) as total FROM complaints WHERE status='Pending'")->fetch_assoc();

// resolved complaints
$resolved = $conn->query("SELECT COUNT(*) as total FROM complaints WHERE status='Resolved'")->fetch_assoc();

// send response
echo json_encode([
  "total" => $total['total'],
  "pending" => $pending['total'],
  "resolved" => $resolved['total']
]);
?>