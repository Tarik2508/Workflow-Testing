let selectedAnswer;           // Merkt sich die ausgewählte Antwort
let currentQuestionIndex = 0; // Index der aktuellen Frage
let correctAnswersCount = 0;  // Anzahl der korrekten Antworten
let totalQuestions = 1;       // Gesamtanzahl der Fragen (Startwert)
const savedData = localStorage.getItem("gameData"); // Überprüfe, ob lokal gespeicherte Daten vorhanden sind

let timerElement = document.querySelector(".timer");
let timeLeft = 15;
let timerInterval;

// Starte den Timer beim Laden der Seite
startTimer();
//Zeige die Aktuelle Frage an
updateQuestionCounter();

// Funktion zum Starten des Timers
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// Funktion zum Aktualisieren des Timers und Behandeln des Zeitablaufs
function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Timer: ${timeLeft}s`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        loadNextQuestion();
        resetTimer();
        
    }
}

// Funktion zum Zurücksetzen des Timers
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    startTimer();
}

// Falls gespeicherte Daten vorhanden sind, lade den Spielstand
if (savedData) {
    const parsedData = JSON.parse(savedData);

    currentQuestionIndex = parsedData.currentQuestionIndex;
    correctAnswersCount = parsedData.correctAnswersCount;
    totalQuestions = parsedData.totalQuestions;
    // Hier könnten weitere gespeicherte Daten wiederhergestellt werden, falls nötig
    updateQuestionCounter();
}
// Funktion zum Speichern des Spielstands in den lokalen Speicher
function saveGameData() {
    const gameData = {
        currentQuestionIndex: currentQuestionIndex,
        correctAnswersCount: correctAnswersCount,
        totalQuestions: totalQuestions,
        timeLeft : timeLeft,
    };

    localStorage.setItem("gameData", JSON.stringify(gameData));
}

// Funktion zum Löschen des Spielstands aus dem lokalen Speicher
function clearGameData() {
    localStorage.removeItem("gameData");
}

// Aktualisiere den Spielstand beim Schließen oder Neuladen der Seite
window.addEventListener("beforeunload", () => {
    saveGameData();
});

// Lade die erste Frage und Antworten beim Start des Spiels
fetch("../csv/fragen.csv")
    .then((response) => response.text())
    .then((data) => {
        // Trenne die CSV-Zeilen und verarbeite jede Zeile separat.
        const rows = data.split("\n");
        const header = rows[0].split(";"); // Spaltenüberschriften

        // Die erste Zeile enthält die Frage.
        document.querySelector(".question").textContent = header[0];

        // Die folgenden Zeilen enthalten die Antworten.
        for (let i = 1; i < header.length; i++) {
            const answerElements = document.querySelectorAll(".answer");
            if (answerElements[i - 1]) {
                answerElements[i - 1].textContent = header[i];
            }
        }
    })
    .catch((error) => console.error("Fehler beim Laden der CSV-Datei:", error));

// Funktion zur Überprüfung der Antwort.
function checkAnswer(selectedAnswer) {
    const currentQuestionElement = document.querySelector(".question");
    const currentQuestion = currentQuestionElement.textContent;

    // Fetch-API verwenden, um die CSV-Datei zu laden
    fetch("../csv/fragen.csv")
        .then((response) => response.text())
        .then((csvData) => {
            // Trenne die CSV-Zeilen und verarbeite jede Zeile separat.
            const rows = csvData.split("\n");

            // Finde die Zeile mit der aktuellen Frage.
            const currentQuestionRow = rows.find((row) =>
                row.startsWith(currentQuestion)
            );

            // Extrahiere die korrekte Antwort aus der CSV.
            const correctAnswer = parseInt(currentQuestionRow.split(";").pop());

            // Vergleiche die ausgewählte Antwort mit der richtigen Antwort.
            if (selectedAnswer === correctAnswer) {
                console.log("Richtig!");
                correctAnswersCount++;
                // Ändere die Hintergrundfarbe für eine kurze Zeit auf grün.
                currentQuestionElement.style.backgroundColor = "green";
            } else {
                console.log("Falsch!");
                // Ändere die Hintergrundfarbe für eine kurze Zeit auf rot.
                currentQuestionElement.style.backgroundColor = "red";
            }

            // Setze die Hintergrundfarbe zurück nach der kurzen Zeit.
            setTimeout(() => {
                currentQuestionElement.style.backgroundColor = "";
                loadNextQuestion();
                console.log(
                    "currentQuestionIndex erhöht, ist nun " + currentQuestionIndex
                );
            }, 100);
        })
        .catch((error) =>
            console.error("Fehler beim Laden der CSV-Datei:", error)
        );
}


// Funktion zum Anzeigen der Fragen und Laden der nächsten Frage
function loadNextQuestion() {
    currentQuestionIndex++;

    // Überprüfe, ob es noch eine weitere Frage gibt
    if (currentQuestionIndex < totalQuestions) {
        // Spiel läuft weiter
        // Fetch-API verwenden, um die CSV-Datei zu laden
        fetch("../csv/fragen.csv")
            .then((response) => response.text())
            .then((csvData) => {
                // Trenne die CSV-Zeilen und verarbeite jede Zeile separat.
                const rows = csvData.split("\n");
                const currentQuestionRow = rows[currentQuestionIndex].split(";");

                // Setze die Frage im HTML
                document.querySelector(".question").textContent = currentQuestionRow[0];

                // Setze die Antworten im HTML
                const answerElements = document.querySelectorAll(".answer");
                for (let i = 1; i < currentQuestionRow.length; i++) {
                    if (answerElements[i - 1]) {
                        answerElements[i - 1].textContent = currentQuestionRow[i];
                    }
                }
                // Aktualisiere den Fragezähler
                updateQuestionCounter();
                resetTimer();
            })
            .catch((error) =>
                console.error("Fehler beim Laden der CSV-Datei:", error)
            );
    } else {
        const correctPercentage = (correctAnswersCount / totalQuestions) * 100;

        if (correctPercentage >= 80) {
            showEndResultScreen();
            currentQuestionIndex = 0;
            correctAnswersCount = 0;
            totalQuestions = 1;
            setTimeout(function () {
                location.replace("../index.php");
            }, 5000); // 5000 Millisekunden entsprechen 10 Sekunden
        } else {
            alert(
                "Sie haben leider eine zu geringe Prozentzahl erreicht. Das Spiel wird nun beendet"
            );
            location.replace("../index.php");
            clearGameData();
        }
    }
}

// Funktion zur Aktualisierung des Fragezählers
function updateQuestionCounter() {
    const csvUrl = "../csv/fragen.csv";

    // Fetch-API verwenden, um die CSV-Datei zu laden
    fetch(csvUrl)
        .then((response) => response.text())
        .then((csvData) => {
            // Trenne die CSV-Zeilen und zähle die Anzahl der Fragen.
            totalQuestions = csvData.split("\n").length;

            // Annahme: Der Counter-Text wird in einem Element mit der Klasse 'question-counter' angezeigt.
            const counterElement = document.querySelector(".questionCounter");

            // Aktualisiere den Counter-Text.
            counterElement.textContent = `${
                currentQuestionIndex + 1
            }/${totalQuestions} Fragen`;
        })
        .catch((error) =>
            console.error("Fehler beim Laden der CSV-Datei:", error)
        );
}

// Funktion zum Anzeigen des Endbildschirms bei Spielgewinn
function showEndResultScreen() {
    const playerName = prompt(
        "Gratulation! Sie haben das Spiel bestanden und werden in die Bestenliste eingetragen. Bitte geben Sie Ihren Namen an!"
    );
    const correctPercentage = (correctAnswersCount / totalQuestions) * 100;


    // Verstecke Frage, Antwortmöglichkeiten und Timer
    document.querySelector(".question").style.display = "none";
    document
        .querySelectorAll(".answer-box")
        .forEach((answerBox) => (answerBox.style.display = "none"));
    document.querySelector(".timer").style.display = "none";

    // Zeige Benutzerinformationen an
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    resultContainer.innerHTML = `<p>${playerName} Herzlichen Glückwunsch, du hast ${correctPercentage.toFixed(2)}
    % der Fragen richtig beantwortet. Wenn Sie zu den besten 15 gehören, werden Sie nun in die Bestenliste eingetragen! Sie werden in 5 Sekunden weitergeleitet.</p>`;
    document.querySelector(".quiz-container").appendChild(resultContainer);

    submitPlayerName(playerName, correctPercentage.toFixed(2));
}

// Funktion zum Übermitteln von Spielername und Prozentzahl an PHP-Datei
function submitPlayerName(playerName, correctPercentage) {
    if (playerName) {
        // Erstelle ein FormData-Objekt, um Daten für die POST-Anfrage zu sammeln
        const formData = new FormData();
        formData.append("playerName", playerName);
        formData.append("percentage", correctPercentage);

        // Führe die POST-Anfrage mit fetch durch
        fetch("index.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                // Hier können Sie die Antwort verarbeiten, wenn nötig
                console.log("Formular erfolgreich abgesendet:", response);
            })
            .catch((error) => {
                console.error("Fehler beim Absenden des Formulars:", error);
            });
    }
}