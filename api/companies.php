<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $sql = $user['role'] === 'admin'
        ? 'SELECT * FROM companies ORDER BY name'
        : 'SELECT * FROM companies WHERE owner_id = ? ORDER BY name';
    $stmt = $db->prepare($sql);
    $user['role'] === 'admin' ? $stmt->execute() : $stmt->execute([$user['id']]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) { $r['owner'] = (int)$r['owner_id']; }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO companies (name,industry,size,revenue,website,owner_id) VALUES (?,?,?,?,?,?)');
    $stmt->execute([$b['name'],$b['industry']??'',$b['size']??'',$b['revenue']??'',$b['website']??'',$b['owner']??$user['id']]);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE companies SET name=?,industry=?,size=?,revenue=?,website=? WHERE id=?')
       ->execute([$b['name'],$b['industry'],$b['size'],$b['revenue'],$b['website'],$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM companies WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
