<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = $db->query('SELECT id,name,role,email,commission_rate FROM users ORDER BY id')->fetchAll();
    foreach ($rows as &$r) {
        $r['commissionRate'] = (float)$r['commission_rate'];
        unset($r['commission_rate']);
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    if ($user['role'] !== 'admin') jsonOut(['error' => 'Forbidden'], 403);
    $b = body();
    $hash = password_hash($b['password']??'changeme', PASSWORD_DEFAULT);
    $stmt = $db->prepare('INSERT INTO users (name,email,password_hash,role,commission_rate) VALUES (?,?,?,?,?)');
    $stmt->execute([$b['name'],$b['email'],$hash,$b['role']??'sales',$b['commissionRate']??0]);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    if ($user['role'] !== 'admin') jsonOut(['error' => 'Forbidden'], 403);
    $b = body();
    $db->prepare('UPDATE users SET name=?,role=?,commission_rate=? WHERE id=?')
       ->execute([$b['name'],$b['role'],$b['commissionRate']??0,$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    if ($user['role'] !== 'admin') jsonOut(['error' => 'Forbidden'], 403);
    $db->prepare('DELETE FROM users WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
