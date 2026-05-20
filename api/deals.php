<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $sql = $user['role'] === 'admin'
        ? 'SELECT * FROM deals ORDER BY id'
        : 'SELECT * FROM deals WHERE owner_id = ? ORDER BY id';
    $stmt = $db->prepare($sql);
    $user['role'] === 'admin' ? $stmt->execute() : $stmt->execute([$user['id']]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['owner']    = (int)$r['owner_id'];
        $r['value']    = (float)$r['deal_value'];
        $r['prob']     = (int)$r['prob'];
        $r['pipeline'] = (int)$r['pipeline_id'];
        $r['close']    = $r['close_date'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO deals (title,deal_value,stage,company,contact,owner_id,prob,close_date,pipeline_id) VALUES (?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$b['title'],$b['value']??0,$b['stage']??'Lead',$b['company']??'',$b['contact']??'',$b['owner']??$user['id'],$b['prob']??50,$b['close']??null,$b['pipeline']??1]);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE deals SET title=?,deal_value=?,stage=?,company=?,contact=?,prob=?,close_date=?,pipeline_id=? WHERE id=?')
       ->execute([$b['title'],$b['value'],$b['stage'],$b['company'],$b['contact'],$b['prob'],$b['close']??null,$b['pipeline'],$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM deals WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
