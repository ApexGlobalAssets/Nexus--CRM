<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $sql = $user['role'] === 'admin'
        ? 'SELECT * FROM contacts ORDER BY name'
        : 'SELECT * FROM contacts WHERE owner_id = ? ORDER BY name';
    $stmt = $db->prepare($sql);
    $user['role'] === 'admin' ? $stmt->execute() : $stmt->execute([$user['id']]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['tags'] = json_decode($r['tags'] ?? '[]', true);
        $r['owner'] = (int)$r['owner_id'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO contacts (name,email,phone,company,role,owner_id,status,tags) VALUES (?,?,?,?,?,?,?,?)');
    $stmt->execute([
        $b['name']??'', $b['email']??'', $b['phone']??'', $b['company']??'',
        $b['role']??'', $b['owner']??$user['id'], $b['status']??'prospect',
        json_encode($b['tags']??[])
    ]);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE contacts SET name=?,email=?,phone=?,company=?,role=?,status=?,tags=? WHERE id=?')
       ->execute([$b['name'],$b['email'],$b['phone'],$b['company'],$b['role'],$b['status'],json_encode($b['tags']??[]),$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM contacts WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
