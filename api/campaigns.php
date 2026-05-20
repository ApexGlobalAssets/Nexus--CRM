<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM campaigns ORDER BY id DESC')->fetchAll();
    foreach ($rows as &$r) {
        $r['sent']    = (int)$r['sent'];
        $r['opened']  = (int)$r['opened'];
        $r['clicked'] = (int)$r['clicked'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO campaigns (name,status,sent,opened,clicked,subject,date,segment) VALUES (?,?,?,?,?,?,?,?)');
    $stmt->execute([$b['name'],$b['status']??'draft',0,0,0,$b['subject']??'',$b['date']??null,$b['segment']??'All Contacts']);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE campaigns SET name=?,status=?,sent=?,opened=?,clicked=?,subject=?,date=?,segment=? WHERE id=?')
       ->execute([$b['name'],$b['status'],$b['sent']??0,$b['opened']??0,$b['clicked']??0,$b['subject'],$b['date']??null,$b['segment'],$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM campaigns WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
