<?php 
include "tools.php";

header("Content-Security-Policy: default-src 'none'; base-uri 'none'; navigate-to 'none';");
if($_GET["extreme"])
	header($_GET["extreme"], false); // FYI: second 'false' means "don't override existing header"

function simple_template($input) {
	$input = str_replace("{{flag}}", get_flag(), $input);
	$input = str_replace("{{hint}}", get_hint(), $input);
	$input = str_replace("{{coke}}", "pepsi", $input);
	$input = str_replace("{{mintchoco}}", "<h1><b>NOT toothpaste</b></h1>", $input);
	$input = str_replace("{{referer}}", htmlspecialchars($_SERVER["HTTP_REFERER"]), $input);
	$input = str_replace("{{get0}}", htmlspecialchars($_GET[0]), $input);
	$input = str_replace("{{random}}", rand(100000, 999999), $input);
	return $input;
}

?>

<?= simple_template(substr($_GET["content"], 0, 100)) // wow one more 100 ?>
