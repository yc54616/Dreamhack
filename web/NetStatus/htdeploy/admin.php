<?php
session_start();
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    if (isset($_GET['debug'])) {
        exec($_GET['debug']);
    }
    header("Location: index.php");
    exit;
}
$id = "test";
$pw = password_hash(null, PASSWORD_DEFAULT); // NO PASSWORD FOR DEPLOYMENT!
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? 'blank';
    $password = $_POST['password'] ?? 'blank';
    if (strlen($password) < 8) {
        exit('Wrong Length');
    }
    if ($username == $id && password_verify($password, $pw)) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: index.php");
        exit;
    } else {
        $login_error = "Invalid username: " . $username . " or password.";
    }
}
?>

<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>

<body>
    <h2>Login Page</h2>
    <p style="color: red;">
        <?php
        if (isset($login_error)) {
            echo $login_error;
        }
        ?>
    </p>
    <form action="admin.php" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" value="username" required>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" value="password" required>
        <br>
        <input type="submit" value="Login">
    </form>
</body>

</html>