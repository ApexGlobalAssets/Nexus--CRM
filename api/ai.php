<?php
require_once __DIR__ . '/db.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonOut(['error' => 'Method not allowed'], 405);
}

$b = body();
$prompt = trim($b['prompt'] ?? '');
if (!$prompt) jsonOut(['error' => 'No prompt'], 400);

$payload = json_encode([
    'model'      => 'claude-sonnet-4-6',
    'max_tokens' => 1000,
    'messages'   => [['role' => 'user', 'content' => $prompt]],
]);

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . ANTHROPIC_API_KEY,
        'anthropic-version: 2023-06-01',
    ],
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    jsonOut(['error' => 'AI request failed'], 502);
}

$data = json_decode($response, true);
$text = $data['content'][0]['text'] ?? 'No response';
jsonOut(['text' => $text]);
