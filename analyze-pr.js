const { Octokit } = require("@octokit/rest");
const { Configuration, OpenAIApi } = require("openai");

// Initialisieren Sie Octokit mit dem bereitgestellten GitHub Token
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// OpenAI Konfiguration und Initialisierung
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
const pull_number = process.env.GITHUB_REF.split('/')[2];

async function main() {
  try {
    // Pull Request Informationen holen
    const { data: prData } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number,
    });

    // Commits des Pull Requests holen
    const { data: commits } = await octokit.rest.pulls.listCommits({
      owner,
      repo,
      pull_number,
    });

    const commitMessages = commits.map(commit => commit.commit.message).join('\n');
    const prompt = `Review the following code changes and commit messages for potential issues:\n\nCode Changes:\n${prData.body}\n\nCommit Messages:\n${commitMessages}`;

    // Senden Sie den Prompt an OpenAI
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Ersetzen Sie dies durch das aktuelle Modell
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 150,
    });

    console.log("AI Analysis:", response.data.choices[0].text);
  } catch (error) {
    console.error("Error fetching PR/commit data or analyzing:", error);
  }
}

main();
