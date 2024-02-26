const { Octokit } = require("@octokit/rest");
const { OpenAI } = require("openai");

// Initialisieren Sie die OpenAI Bibliothek mit Ihrem API-Schlüssel
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
const pull_number = process.env.GITHUB_REF.split('/')[2];

async function main() {
  // Erstellen Sie eine Instanz von Octokit
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    // Rest des Codes zur Abfrage der Pull Request und Commit-Daten...
    
    // Beispiel für den Aufruf der OpenAI API
    const response = await openai.createCompletion({
      model: "GPT-4", // Aktualisieren Sie dies entsprechend der neuesten Modellversion
      prompt: "Ihr Prompt hier...",
      temperature: 0.7,
      max_tokens: 150,
    });

    console.log("AI Analysis:", response.data.choices[0].text);
  } catch (error) {
    console.error("Error fetching PR/commit data or analyzing:", error);
  }
}

main();
