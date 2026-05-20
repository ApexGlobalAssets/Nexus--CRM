<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/db.php';
$db = getDb();
$stmt = $db->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
$stmt->execute(['alex@nexuscrm.io']);
$user = $stmt->fetch();
echo "User found: " . ($user ? 'yes' : 'no') . "\n";
if ($user) {
    echo "Hash: " . $user['password_hash'] . "\n";
    echo "Verify 'password': " . (password_verify('password', $user['password_hash']) ? 'OK' : 'FAIL') . "\n";
}
