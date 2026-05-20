<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/db.php';
echo "db.php loaded OK\n";
echo "PHP version: " . phpversion() . "\n";
try {
    $db = getDb();
    echo "DB connected OK\n";
    $row = $db->query('SELECT COUNT(*) as c FROM users')->fetch();
    echo "Users in DB: " . $row['c'] . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
