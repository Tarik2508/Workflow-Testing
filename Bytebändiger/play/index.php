<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Wenn das Formular abgeschickt wurde
    // Überprüfe, ob der Spielername gesetzt ist
    if (isset($_POST["playerName"]) && isset($_POST["percentage"])) {
        $playerName = str_replace(' ', '', $_POST["playerName"]); // Alle Leerzeichen entfernen
        $percentage = floatval($_POST["percentage"]);

        // Füge den neuen Spieler zum Leaderboard hinzu
        $file = fopen("../csv/bestenliste.csv", "a");

        // Öffne die Datei im Anhänge-Modus
        if ($file) {
            // Verwende ein Komma als Trennzeichen und füge das Prozentzeichen hinzu
            fputcsv($file, array($playerName, $percentage . "%"), ",", "\n");
            fclose($file);
            echo "Daten erfolgreich hinzugefügt!";
        } else {
            echo "Die Datei konnte nicht geöffnet werden.";
        }
    } else {
        echo "Spielername oder Prozentsatz fehlen in der Anfrage.";
    }
}
?>


<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kahoot game</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div class="quiz-container wrapper">
        <div class="questionCounter">1/X Fragen</div>

        <div class="timer">Timer: 15s</div>

        <div class="question">antwort box</div>

        <div class="answer-row">
            <div class="answer-box" style="background-color: #ff3355;" onclick="checkAnswer(1)">
                <div class="answer"></div>
            </div>
            <div class="answer-box" style="background-color: #45a3e5;" onclick="checkAnswer(2)">
                <div class="answer"></div>
            </div>
        </div>
        <div class="answer-row">
            <div class="answer-box" style="background-color: #ffc00a;" onclick="checkAnswer(3)">
                <div class="answer"></div>
            </div>
            <div class="answer-box" style="background-color: #66bf39;" onclick="checkAnswer(4)">
                <div class="answer"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>