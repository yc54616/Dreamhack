<?php

$content = "";

$uid = $_GET["uid"];
$uid = md5($uid);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $content = "WE DON'T LIKE GET. GET IS INSECURE";
}
else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // From https://stackoverflow.com/a/48653050
    $content = "$_SERVER[REQUEST_METHOD] $_SERVER[REQUEST_URI] $_SERVER[SERVER_PROTOCOL]\r\n";
    foreach (getallheaders() as $name => $value) {
        $content .= "$name: $value\r\n";
    }
    $content .= "\r\n" . file_get_contents('php://input');
}
else {
    $content = "";
}

file_put_contents("/tmp/request_dump_{$uid}.txt", $content);
