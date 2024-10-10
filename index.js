#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const { generateReadme } = require('./index');
const chalk = require('chalk');
const ora = require('ora');

program
  .version('1.0.0')
  .description('Generate README for MERN stack applications');

program.action(async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Provide a brief description of your project:'
      },
      {
        type: 'input',
        name: 'apiKey',
        message: 'Enter your OpenAI API key:',
        mask: '*'
      }
    ]);

    const spinner = ora('Generating README...').start();
    
    const readme = await generateReadme(answers);
    
    spinner.succeed('README.md generated successfully!');
    console.log(chalk.green('\nREADME.md has been created in your current directory.'));
    
  } catch (error) {
    console.error(chalk.red('Error generating README:', error.message));
    process.exit(1);
  }
});

program.parse(process.argv);