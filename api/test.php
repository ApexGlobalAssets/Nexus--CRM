<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/db.php';
$db = getDb();
$rows = $db->query('SELECT id, name, email FROM users')->fetchAll();
foreach ($rows as $r) {
    echo $r['id'] . " | " . $r['name'] . " | " . $r['email'] . "\n";
}
