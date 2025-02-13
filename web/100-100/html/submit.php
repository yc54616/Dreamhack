<?php

$url = $_POST["url"] ?? "";
if (substr($url, 0, strlen("http://localhost/")) === "http://localhost/") {

	$param = base64_encode($url);
	$param = escapeshellarg($param);
	exec("node /app/bot.js {$param} > /dev/null &");
	die("<script>alert('Done!'); location.href='/';</script>");
}
else if($url !== "") {
	die("no");
}
?>
<html>
<body>
<h3>100-100 Bot Request</h3>
<form method="POST">
Note: URL should start with 'http://localhost/'<br>
URL: <input type='text' name='url' placeholder='http://localhost/....' style='width: 420px'>
</form>
</body>
</html>
