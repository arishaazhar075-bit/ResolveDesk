<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "db.php";

// 🔒 Basic validation
if (!isset($_POST['id']) || !isset($_POST['status'])) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

$id = $_POST['id'];
$status = $_POST['status'];

// 🔐 Prepare statement (secure)
$stmt = $conn->prepare("UPDATE complaints SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Status updated",
        "id" => $id,
        "status" => $status
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error updating status"
    ]);
}
?>