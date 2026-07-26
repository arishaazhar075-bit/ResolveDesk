<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';

$sql = "SELECT * FROM complaints WHERE 1";

// 🔍 Search by complaint_id (case-insensitive + safe)
// 🔍 Search by ticket_id (case-insensitive)
$role = isset($_GET['role']) ? $_GET['role'] : '';

$sql = "SELECT * FROM complaints WHERE 1";

// 🔍 search
if (!empty($search)) {
    $search = strtolower($search);
    $sql .= " AND LOWER(ticket_id) LIKE '%$search%'";
}

// 🎯 status filter
if (!empty($status)) {
    $status = strtolower($status);
    $sql .= " AND LOWER(status) = '$status'";
}

// 🚫 restrict student only (NOT admin)
if ($role !== "admin" && empty($search)) {
    $sql .= " AND 0";
}

// 🎯 Filter by status (case-insensitive)
if (!empty($status)) {
    $status = strtolower($status);
    $sql .= " AND LOWER(status) = '$status'";
}

$result = $conn->query($sql);

$complaints = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }
}

echo json_encode($complaints);
?>