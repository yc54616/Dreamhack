<?php

if($_GET["uid"]) {
	$uid = md5($_GET["uid"]);
	header("Content-Type: text/plain");
	$x = @file_get_contents("/tmp/request_dump_{$uid}.txt");
	if($x === false)
		die("No such request");
	die($x);
}

?>
<html>
<body>
<h3>100-100 RequestBin</h3>
<form method="GET">
Lookup UID: <input type='text' name='uid' style='width: 420px'>
</form>
</body>
</html>
