<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();
$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    $sql = $user['role'] === 'admin'
        ? 'SELECT * FROM tasks ORDER BY due_date, id'
        : 'SELECT * FROM tasks WHERE owner_id = ? ORDER BY due_date, id';
    $stmt = $db->prepare($sql);
    $user['role'] === 'admin' ? $stmt->execute() : $stmt->execute([$user['id']]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['owner']   = (int)$r['owner_id'];
        $r['dueDate'] = $r['due_date'];
    }
    jsonOut($rows);
}

if ($method === 'POST') {
    $b = body();
    $stmt = $db->prepare('INSERT INTO tasks (title,contact,due_date,priority,status,owner_id,notes) VALUES (?,?,?,?,?,?,?)');
    $stmt->execute([$b['title'],$b['contact']??'',$b['dueDate']??null,$b['priority']??'Medium',$b['status']??'open',$b['owner']??$user['id'],$b['notes']??'']);
    jsonOut(['id' => (int)$db->lastInsertId()]);
}

if ($method === 'PUT' && $id) {
    $b = body();
    $db->prepare('UPDATE tasks SET title=?,contact=?,due_date=?,priority=?,status=?,notes=? WHERE id=?')
       ->execute([$b['title'],$b['contact'],$b['dueDate']??null,$b['priority'],$b['status'],$b['notes']??'',$id]);
    jsonOut(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM tasks WHERE id=?')->execute([$id]);
    jsonOut(['ok' => true]);
}
