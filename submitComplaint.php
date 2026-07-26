<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

// 🚫 Stop if no data
if (!$data) {
    echo "No data received";
    exit();
}

// 🚫 Strict validation (VERY IMPORTANT)
if (
    empty($data['user_id']) ||
    empty($data['category']) ||
    empty($data['priority']) ||
    empty($data['title']) ||
    empty($data['description'])
) {
    echo "Invalid request";
    exit();
}

// ✅ Assign values safely
$user_id = $data['user_id'];
$category = $data['category'];
$priority = $data['priority'];
$title = $data['title'];
$description = $data['description'];
$department = $data['department'] ?? '';
$student_id = $data['student_id'] ?? '';

// ✅ Generate ID
$ticket = "TKT" . rand(100, 999);

// ✅ Insert ONLY ONCE
$sql = "INSERT INTO complaints 
(user_id, category, priority, title, description, department, student_id, ticket_id)
VALUES 
('$user_id', '$category', '$priority', '$title', '$description', '$department', '$student_id', '$ticket')";

if ($conn->query($sql)) {
  echo json_encode([
  "message" => "Complaint submitted",
  "ticket_id" => $ticket
]);
} else {
    echo "Error: " . $conn->error;
}
?>