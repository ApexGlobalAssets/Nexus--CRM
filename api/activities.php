<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $sql = $user['role'] === 'admin'
        ? 'SELECT * FROM activities ORDER BY date DESC, id DESC'
        : 'SELECT * FROM activities WHERE owner_id = ? ORDER BY date DESC, id DESC';
    $stmt = $db->prepare($sql);
    $user['role'] === 'admin' ? $stmt->execute() : $stmt->execute([$user['id']]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) { $r['owner'] = (int)$r['owner_id']; }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO activities (type,contact,company,date,time,duration,outcome,notes,owner_id) VALUES (?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$b['type']??'Note',$b['contact']??'',$b['company']??'',$b['date']??date('Y-m-d'),$b['time']??'',$b['duration']??'',$b['outcome']??'',$b['notes']??'',$b['owner']??$user['id']]);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE activities SET type=?,contact=?,company=?,date=?,time=?,duration=?,outcome=?,notes=? WHERE id=?')
       ->execute([$b['type'],$b['contact'],$b['company'],$b['date'],$b['time'],$b['duration'],$b['outcome'],$b['notes'],$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM activities WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
