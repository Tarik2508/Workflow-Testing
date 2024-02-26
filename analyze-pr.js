const { Octokit } = require("@octokit/rest");
const { OpenAI } = require("openai");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openai = new OpenAI(process.env.OPENAI_API_KEY);

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
  const response = await openai.createCompletion({
    model: "text-davinci-003", // Ersetzen Sie dies ggf. mit einem neueren Modell
    prompt,
    temperature: 0.5,
    max_tokens: 256,
  });

  return response.data.choices[0].text;
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
