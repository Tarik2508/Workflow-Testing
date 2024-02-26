Quiz-Programm Dokumentation

Überblick
Willkommen zur Dokumentation des Quiz-Programms! Dieses Tool wurde entwickelt, um betriebsinterne Fortbildungen zu unterstützen. Benutzer können Fragen aus einer CSV-Datei beantworten und ihren Wissensstand überprüfen.

Spielablauf

Startseite

Die Startseite präsentiert eine Bestenliste der Top 15 Spieler. Benutzer haben die Wahl zwischen den Optionen "Spielen" und "Login".

Fragen und Antworten

Das Programm liest Fragen und mögliche Antworten aus einer CSV-Datei. Diese werden in zufälliger Reihenfolge präsentiert, und Benutzer können ihre Antwort auswählen, woraufhin das Programm Feedback gibt.

Timer

Für jede Frage läuft ein 15-Sekunden-Timer. Bei Ablauf geht das Spiel zur nächsten Frage über.

Admin-Bereich

Authentifizierung
Der Login-Prozess im Admin-Bereich ist sicher und stellt sicher, dass nur autorisierte Benutzer Zugriff haben.

Admin-Dashboard

Das Dashboard ermöglicht das Bearbeiten, Löschen und Hinzufügen von Fragen sowie das Zurücksetzen der Bestenliste.

Technologien

Das Quiz-Programm setzt auf folgende Technologien:

Frontend: HTML, CSS, JavaScript
Backend: PHP
Datenhaltung: CSV-Dateien
Cloud-Implementierung auf AWS
Das Programm wird auf einem AWS Cloud-Server betrieben:

Infrastruktur: Terraform

DNS: Amazon Route 53
Standort: Frankfurt
VPC: Amazon Virtual Private Cloud (VPC) mit einem Application Load Balancer (ALB)
Containerisierung: AWS Fargate für die Ausführung von PHP-Containern in einem privaten Subnetz
Sicherheit
Umfangreiche Sicherheitsmaßnahmen, besonders beim Admin-Login, sind implementiert, um unbefugten Zugriff zu verhindern.

Anpassbarkeit und Erweiterbarkeit

Das Quiz-Programm ist äußerst flexibel und kann durch das Hinzufügen neuer Fragen oder Anpassen des Designs einfach erweitert werden.

Verzeichnisstruktur

- Login
  -> AdminSucessLogin.php, adminstyle.css, functions.php, login.php, style.css
- CSV
  -> bestenliste.csv, fragen.csv, logindata.csv
- Img
  -> Kahoot.jpg, Kahoot_logo.png, loop.jpg, mediaquerie.jpg, stars.jpg
- Play
  -> index.php, script.js, style.css
- Index.php
- Style.css
-----------------------------------------------------------------------------------------------------------------------------------------------------------

Quiz Program Documentation

Overview
Welcome to the documentation of the Quiz Program! This tool has been developed to support internal training within the company. Users can answer questions from a CSV file and assess their knowledge.

Gameplay

Homepage
The homepage displays a leaderboard of the top 15 players. Users can choose between the options "Play" and "Login."

Questions and Answers

The program reads questions and possible answers from a CSV file. These are presented in random order, and users can select their answer, after which the program provides feedback.

Timer

A 15-second timer runs for each question. When the timer expires, the game proceeds to the next question.

Admin Area

Authentication

The login process in the admin area is secure and ensures that only authorized users have access.

Admin Dashboard

The dashboard allows for editing, deleting, and adding questions, as well as resetting the leaderboard.

Technologies

The Quiz Program utilizes the following technologies:

Frontend: HTML, CSS, JavaScript
Backend: PHP
Data Storage: CSV files
Cloud Implementation on AWS
The program is hosted on an AWS Cloud server:

Infrastructure: Terraform

DNS: Amazon Route 53
Location: Frankfurt
VPC: Amazon Virtual Private Cloud (VPC) with an Application Load Balancer (ALB)
Containerization: AWS Fargate for running PHP containers in a private subnet
Security
Comprehensive security measures, particularly during admin login, are implemented to prevent unauthorized access.

Customization and Expandability

The Quiz Program is highly flexible and can be easily expanded by adding new questions or customizing the design.

Directory Structure

- Login
  -> AdminSucessLogin.php, adminstyle.css, functions.php, login.php, style.css
- CSV
  -> bestenliste.csv, fragen.csv, logindata.csv
- Img
  -> Kahoot.jpg, Kahoot_logo.png, loop.jpg, mediaquerie.jpg, stars.jpg
- Play
  -> index.php, script.js, style.css
- Index.php
- Style.css





