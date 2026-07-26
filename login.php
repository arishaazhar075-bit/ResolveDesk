<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// ✅ Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header("Content-Type: application/json");

include "db.php";

// ❗ show errors (for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// ❗ basic validation
if (!$email || !$password) {
    echo json_encode([
        "message" => "Email and password required"
    ]);
    exit;
}

// ❗ safer query
$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "message" => "SQL Error",
        "error" => $conn->error
    ]);
    exit;
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    echo json_encode([
        "message" => "Login successful",
        "role" => $row['role']
    ]);
} else {
    echo json_encode([
        "message" => "Invalid login"
    ]);
}
?>