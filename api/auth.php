<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/db.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];

// GET — return current session user
if ($method === 'GET') {
    if (!empty($_SESSION['user'])) {
        jsonOut($_SESSION['user']);
    }
    jsonOut(null, 204);
}

// POST — login
if ($method === 'POST') {
    $b = body();
    $email = trim($b['email'] ?? '');
    $password = $b['password'] ?? '';

    $db = getDb();
    $stmt = $db->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonOut(['error' => 'Invalid credentials'], 401);
    }

    unset($user['password_hash']);
    $user['commissionRate'] = (float)$user['commission_rate'];
    $_SESSION['user'] = $user;
    jsonOut($user);
}

// DELETE — logout
if ($method === 'DELETE') {
    session_destroy();
    jsonOut(['ok' => true]);
}
