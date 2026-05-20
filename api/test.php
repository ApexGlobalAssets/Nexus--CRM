<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/config.php';
echo "Host: " . DB_HOST . "\n";
echo "DB: " . DB_NAME . "\n";
echo "User: " . DB_USER . "\n";
try {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
    echo "DB connected OK\n";
} catch (Exception $e) {
    echo "DB error: " . $e->getMessage() . "\n";
}
