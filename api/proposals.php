<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM proposals ORDER BY id DESC')->fetchAll();
    foreach ($rows as &$r) {
        $r['lines'] = json_decode($r['lines'] ?? '[]', true);
        $r['vat']   = (bool)$r['vat'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $count = $db->query('SELECT COUNT(*) FROM proposals')->fetchColumn();
    $number = $b['number'] ?? ('QUO-' . str_pad($count + 1, 3, '0', STR_PAD_LEFT));
    $stmt = $db->prepare('INSERT INTO proposals (number,contact,company,status,date,expiry,vat,notes,lines) VALUES (?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$number,$b['contact']??'',$b['company']??'',$b['status']??'draft',$b['date']??date('Y-m-d'),$b['expiry']??null,$b['vat']?1:0,$b['notes']??'',json_encode($b['lines']??[])]);
    jsonOut(['id' => (int)$db->lastInsertId(), 'number' => $number]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE proposals SET contact=?,company=?,status=?,expiry=?,vat=?,notes=?,lines=? WHERE id=?')
       ->execute([$b['contact'],$b['company'],$b['status'],$b['expiry']??null,$b['vat']?1:0,$b['notes'],json_encode($b['lines']??[]),$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM proposals WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
