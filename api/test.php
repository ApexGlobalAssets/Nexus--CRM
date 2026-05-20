<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/db.php';
$db = getDb();
$user = $db->query("SELECT * FROM users WHERE email = 'ryan@apexglobalasset.com'")->fetch();
echo "Hash: " . $user['password_hash'] . "\n";
echo "Verify 'Alexglobal1!': " . (password_verify('Alexglobal1!', $user['password_hash']) ? 'OK' : 'FAIL') . "\n";
echo "Verify 'password': " . (password_verify('password', $user['password_hash']) ? 'OK' : 'FAIL') . "\n";
