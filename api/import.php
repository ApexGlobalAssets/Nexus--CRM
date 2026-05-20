<?php
require_once __DIR__ . '/db.php';
$user = requireAuth();
$db   = getDb();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonOut(['error' => 'Method not allowed'], 405);
}

$b    = body();
$type = $b['type'] ?? ''; // 'contacts' or 'companies'
$rows = $b['rows'] ?? [];

if (!in_array($type, ['contacts', 'companies']) || !is_array($rows)) {
    jsonOut(['error' => 'Invalid request'], 400);
}

$inserted = 0;
$errors   = [];

if ($type === 'contacts') {
    $stmt = $db->prepare('INSERT INTO contacts (name, email, phone, company, title, status, owner_id) VALUES (?,?,?,?,?,?,?)');
    foreach ($rows as $i => $r) {
        if (empty($r['name'])) { $errors[] = "Row $i: name required"; continue; }
        try {
            $stmt->execute([
                $r['name'], $r['email'] ?? '', $r['phone'] ?? '',
                $r['company'] ?? '', $r['title'] ?? '',
                $r['status'] ?? 'Lead', $user['id']
            ]);
            $inserted++;
        } catch (Exception $e) {
            $errors[] = "Row $i: " . $e->getMessage();
        }
    }
}

if ($type === 'companies') {
    $stmt = $db->prepare('INSERT INTO companies (name, industry, website, employees, revenue, status) VALUES (?,?,?,?,?,?)');
    foreach ($rows as $i => $r) {
        if (empty($r['name'])) { $errors[] = "Row $i: name required"; continue; }
        try {
            $stmt->execute([
                $r['name'], $r['industry'] ?? '', $r['website'] ?? '',
                (int)($r['employees'] ?? 0), (float)($r['revenue'] ?? 0),
                $r['status'] ?? 'Active'
            ]);
            $inserted++;
        } catch (Exception $e) {
            $errors[] = "Row $i: " . $e->getMessage();
        }
    }
}

jsonOut(['inserted' => $inserted, 'errors' => $errors]);
