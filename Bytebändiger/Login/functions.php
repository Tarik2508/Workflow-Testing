<?php
if (isset($_POST['delete'])) {
    // Wenn der "Löschen"-Button gedrückt wurde
    deleteRow($_POST['questionr']);
}


if (isset($_POST['edit'])) {
    // Wenn der "Bearbeiten"-Button gedrückt wurde
    // Lese die Daten aus dem Formular
    $questionr = $_POST['questionr'];
    $answer1 = $_POST['answer1'];
    $answer2 = $_POST['answer2'];
    $answer3 = $_POST['answer3'];
    $answer4 = $_POST['answer4'];
    $answer5 = $_POST['answer5'];

    // Code zum Bearbeiten der Zeile
    editRow($questionr, $answer1, $answer2, $answer3, $answer4, $answer5);
}


function deleteRow($questionr)
{
    // Code zum Löschen der Zeile, den du bereits implementiert hast
    $lines = file("../csv/fragen.csv", FILE_IGNORE_NEW_LINES);

    foreach ($lines as $key => $line) {
        $values = explode(';', $line);
        $entryIdentifier = htmlspecialchars($values[0]);

        if (trim($entryIdentifier) == trim($questionr)) {
            unset($lines[$key]);
            break;
        }
    }

    file_put_contents("../csv/fragen.csv", implode("\n", $lines));
}


function editRow($questionr, $answer1, $answer2, $answer3, $answer4, $answer5)
{
    // Code zum Bearbeiten der Zeile
    $lines = file("../csv/fragen.csv", FILE_IGNORE_NEW_LINES);

    foreach ($lines as $key => $line) {
        $values = explode(';', $line);
        $entryIdentifier = htmlspecialchars($values[0]);

        if (trim($entryIdentifier) == trim($questionr)) {
            // Bearbeite die gefundene Zeile
            $lines[$key] = "$questionr;$answer1;$answer2;$answer3;$answer4;$answer5";
            break;
        }
    }

    file_put_contents("../csv/fragen.csv", implode("\n", $lines));
}

/* BUGG BERGE ABI FRAGEN NACHDEM MAN WAS LÖSCHT KEINE NEW LINE*/
if (isset($_POST['add'])) {
    $newQuestion = $_POST['newQuestionr'];
    $newAnswer1 = $_POST['newAnswer1'];
    $newAnswer2 = $_POST['newAnswer2'];
    $newAnswer3 = $_POST['newAnswer3'];
    $newAnswer4 = $_POST['newAnswer4'];
    $correctAnswer = $_POST['newAnswer5'];

    $newQuestionData = "\n$newQuestion;$newAnswer1;$newAnswer2;$newAnswer3;$newAnswer4;$correctAnswer";

    $file = fopen("../csv/fragen.csv", "a");
    fwrite($file, $newQuestionData);
    fclose($file);
}

if (isset($_POST['resetScoreboard'])) {
    $file = fopen("../csv/bestenliste.csv", "w");

    // Schreibe nichts in die Datei, um sie zu leeren
    fwrite($file, "");

    // Schließe die Datei
    fclose($file);
}
