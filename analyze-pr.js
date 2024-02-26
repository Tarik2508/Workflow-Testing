const { Octokit } = require("@octokit/rest");
const { Configuration, OpenAIApi } = require("openai");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Initialisieren Sie die Konfiguration für die OpenAI API mit Ihrem API-Schlüssel
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const pull_number = process.env.PR_NUMBER; // Stellen Sie sicher, dass diese Umgebungsvariable korrekt gesetzt ist.

async function fetchPRAndCommitData() {
  // Pull Request Informationen abfragen
  const { data: prData } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  // Commit-Historie für den Pull Request abfragen
  const { data: commits } = await octokit.rest.pulls.listCommits({
    owner,
    repo,
    pull_number,
  });

  const commitMessages = commits.map(commit => `- ${commit.commit.message}`).join('\n');

  return {
    prBody: prData.body,
    commitMessages,
  };
}

async function analyzeWithOpenAI(prompt) {
  // Anpassung für den Aufruf der createCompletion Methode
  const response = await openai.createCompletion({
    model: "text-davinci-003", // Aktualisieren Sie dies entsprechend Ihrer Anforderung
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 256,
  });

  return response.choices[0].text; // Anpassung basierend auf der tatsächlichen Antwortstruktur
}

async function postCommentOnPR(comment) {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pull_number,
    body: comment,
  });
}

async function main() {
  try {
    const { prBody, commitMessages } = await fetchPRAndCommitData();
    const prompt = `Please review the following Pull Request description and commit messages for potential issues:\n\nPull Request Description:\n${prBody}\n\nCommit Messages:\n${commitMessages}`;

    const analysis = await analyzeWithOpenAI(prompt);
    const comment = `## AI Analysis\n\n${analysis}`;

    await postCommentOnPR(comment);

    console.log("AI analysis posted as comment successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
