const { Octokit } = require("@octokit/rest");
const { OpenAI } = require("openai");

// Initialisieren Sie die OpenAI Bibliothek mit Ihrem API-Schlüssel
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
// Beachten Sie, dass GITHUB_REF für Pull Requests nicht direkt die PR-Nummer enthält. Diese Annahme muss angepasst werden.
const pull_number = process.env.GITHUB_REF ? process.env.GITHUB_REF.split('/')[2] : null;

async function main() {
  // Erstellen Sie eine Instanz von Octokit
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    if (!pull_number) {
      console.log("Keine Pull-Request-Nummer gefunden.");
      return;
    }

    // Rest des Codes zur Abfrage der Pull Request und Commit-Daten...

    // Beispiel für den Aufruf der OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Aktualisieren Sie dies entsprechend der neuesten Modellversion
      prompt: "Ihr Prompt hier...",
      temperature: 0.7,
      max_tokens: 150,
    });

    // Kommentar mit GPT-4 Analyse hinzufügen
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number, // Pull Request Nummern sind identisch mit Issue Nummern in GitHub
      body: `## AI-gestützte Codeanalyse\n\n${response.data.choices[0].text}`,
    });

    console.log("Kommentar erfolgreich hinzugefügt.");
  } catch (error) {
    console.error("Fehler beim Erstellen des Kommentars:", error);
  }
}

main();
