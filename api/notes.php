<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM notes ORDER BY date DESC')->fetchAll();
    foreach ($rows as &$r) {
        $r['contactId'] = (int)$r['contact_id'];
        $r['owner']     = (int)$r['owner_id'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO notes (contact_id,text,date,owner_id) VALUES (?,?,?,?)');
    $stmt->execute([$b['contactId']??0,$b['text']??'',$b['date']??date('Y-m-d'),$b['owner']??$user['id']]);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM notes WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
