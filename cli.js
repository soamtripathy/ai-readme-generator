const fs = require('fs').promises;
const OpenAI = require('openai');

async function generateReadme({ projectName, projectDescription, apiKey }) {
  const openai = new OpenAI({ apiKey });

  const prompt = `Generate a detailed README.md for a MERN (MongoDB, Express.js, React.js, Node.js) stack application with the following details:
  Project Name: ${projectName}
  Description: ${projectDescription}

  Include the following sections:
  1. Project Overview
  2. Features
  3. Tech Stack
  4. Prerequisites
  5. Installation Steps
  6. Environment Variables
  7. API Endpoints
  8. Folder Structure
  9. Contributing Guidelines
  10. License

  Make it professional and well-formatted in Markdown.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const readmeContent = completion.choices[0].message.content;
    await fs.writeFile('README.md', readmeContent);
    return readmeContent;
  } catch (error) {
    throw new Error(`Failed to generate README: ${error.message}`);
  }
}

module.exports = { generateReadme };