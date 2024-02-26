<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Check if the form is submitted
include './functions.php';
$handle = fopen("../csv/logindata.csv", "r");

while (($line = fgets($handle)) !== FALSE) {
    $data = explode(';', $line);
    $data[0] = trim($data[0]);
    $data[1] = trim($data[1]);

    if ($data[0] == $_SESSION['username'] && $data[1] == $_SESSION['password']) {
        $success = true;
        break;
    }
}

if (!$success) {
    echo "Login ungültig";
    echo $_SESSION['username'];

    echo $_SESSION['password'];
    exit;
}


?>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./adminstyle.css">
</head>

<body>

    <div class="wrapper">

        <h1 class="">Admin Dashboard</h1>

        <h2 class="">Neue Fragen erstellen</h2>

        <form method='post' id="newQuestionForm">
            <!-- Hier füge die Felder für die neue Frage hinzu -->
            <input name='newQuestionr' class="input-box" placeholder='Neue Frage'>
            <input name='newAnswer1' class='input-box' placeholder='Antwort 1' required>
            <input name='newAnswer2' class='input-box' placeholder='Antwort 2' required>
            <input name='newAnswer3' class='input-box' placeholder='Antwort 3' required>
            <input name='newAnswer4' class='input-box' placeholder='Antwort 4' required>
            <input name='newAnswer5' class='input-box' placeholder='Richtige antwort (Zahl)' required>
            <button type='submit' class='btn' name='add'>Fragen Hinzufügen</button>

        </form>
        <h2 class="">Bestenliste Zurücksetzen</h2>
        <form method='post' id="resetScoreboard">

            <button type='submit' class='btn' name='resetScoreboard'>Zurücksetzen</button>

        </form>


    </div>
    <br>
    <div class='wrapper'>

        <h2>Fragen Bearbeiten</h2>
        <?php
        $f = fopen("../csv/fragen.csv", "r");
        while (($line = fgetcsv($f)) !== false) {
            echo "<form method='post' action='adminSucessLogin.php'>"; // Formular für jedes Datenelement

            echo "</label>\n";

            $values = explode(';', $line[0]);
            $entryIdentifier = htmlspecialchars($values[0]);

            echo "<input class='input-box' name='questionr' value='" . htmlspecialchars($values[0]) . "'>";
            echo "<input class='input-box ' name='answer1' value='" . htmlspecialchars($values[1]) . "'>";
            echo "<input class='input-box' name='answer2' value='" . htmlspecialchars($values[2]) . "'>";
            echo "<input class='input-box' name='answer3' value='" . htmlspecialchars($values[3]) . "'>";
            echo "<input class='input-box' name='answer4' value='" . htmlspecialchars($values[4]) . "'>";
            echo "<input class='input-box' name='answer5' value='" . htmlspecialchars($values[5]) . "'>";
            echo "<input class='btn' type='submit' name='delete' value='Löschen'>";
            echo "<input class='btn' type='submit' name='edit' value='Bearbeiten'>" . "<br>";
            echo "</form>";
        }
        fclose($f);

        ?>
    </div>



</body>

</html>