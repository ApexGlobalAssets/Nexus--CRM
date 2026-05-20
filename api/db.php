<?php
require_once __DIR__ . '/config.php';

function getDb(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    }
    return $pdo;
}

function jsonOut(mixed $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function requireAuth(): array {
    session_start();
    if (empty($_SESSION['user'])) {
        jsonOut(['error' => 'Unauthorized'], 401);
    }
    return $_SESSION['user'];
}

function body(): array {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}
