<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM invoices ORDER BY id DESC')->fetchAll();
    foreach ($rows as &$r) {
        $r['amount']    = (float)$r['amount'];
        $r['recurring'] = (bool)$r['recurring'];
        $r['dueDate']   = $r['due_date'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    // Auto-generate number if not provided
    $count = $db->query('SELECT COUNT(*) FROM invoices')->fetchColumn();
    $number = $b['number'] ?? ('INV-' . str_pad($count + 1, 3, '0', STR_PAD_LEFT));
    $stmt = $db->prepare('INSERT INTO invoices (number,contact,company,amount,status,due_date,recurring,interval_type,issued) VALUES (?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$number,$b['contact']??'',$b['company']??'',$b['amount']??0,$b['status']??'draft',$b['dueDate']??null,$b['recurring']?1:0,$b['interval']??null,$b['issued']??date('Y-m-d')]);
    jsonOut(['id' => (int)$db->lastInsertId(), 'number' => $number]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE invoices SET contact=?,company=?,amount=?,status=?,due_date=?,recurring=?,interval_type=? WHERE id=?')
       ->execute([$b['contact'],$b['company'],$b['amount'],$b['status'],$b['dueDate']??null,$b['recurring']?1:0,$b['interval']??null,$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM invoices WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
