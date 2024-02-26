<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['password'] = $_POST['password'];
    header("Location:./adminSucessLogin.php");
}


?>
<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="./style.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

</head>

<body>
    <div class="flex wrapper">
        <form action="" method="post">
            <img class="flex" src="../img/kahoot_logo.png" alt="kahoot_Logo">
            <h1>Login </h1>
            <div class="input-box">
                <input type="text" name="username" placeholder="Benutzername" required>
                <i class='bx bx-user'></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="Passwort" required>
                <i class='bx bx-lock-alt'></i>
            </div>
            <button class="btn" type="submit">Anmelden</button>



        </form>
    </div>
</body>



</html>