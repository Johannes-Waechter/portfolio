<?php
header('Content-Type: text/plain; charset=utf-8');
echo "PHP funktioniert!\n";
echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST-Daten empfangen:\n";
    print_r($_POST);
} else {
    echo "Kein POST, sondern: " . $_SERVER['REQUEST_METHOD'] . "\n";
}
?>
