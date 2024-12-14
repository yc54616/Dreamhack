<?php
require("db.php");
session_start();

if ($_SESSION['admin']) {
	if ($_POST['filename']) {
		include "./templates/dashboard.html";
		include ($_POST['filename']);
    	}
	else {
		include "./templates/dashboard.html";
	}
}
else {
    echo "<div class='center-text'>You are not admin.</div>";
}
?>

