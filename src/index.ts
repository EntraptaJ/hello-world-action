// src/index.ts
import { getInput, setFailed } from '@actions/core';
import { sync } from 'glob';
import { parse } from 'path';
import run from './run';
import * as github from '@actions/github';

const token = getInput('github-token', { required: true });
const octokit = new github.GitHub(token);

async function helloWorld(): Promise<void> {
  const { pull_request: pr } = github.context.payload;
  if (!pr) {
    throw new Error('Event payload missing `pull_request`');
  }

  console.log(pr);
  try {
    const filenames = sync(`${process.env.GITHUB_WORKSPACE}/**/package.json`);

    for (const filename of filenames) {
      await run(`npm install`, { cwd: parse(filename).dir });
      try {
        await run(`npm test`);
      } catch {
        await octokit.issues.createComment({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          issue_number: pr.number,
          body: '`npm run test` has failed',
        });
        setFailed('npm run test failed');
      }
      try {
        await run(`npm run lint`);
      } catch {
        await octokit.issues.createComment({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          issue_number: pr.number,
          body: '`npm run lint` has failed',
        });
        setFailed('npm run lint failed');
      }
    }
  } catch (error) {
    setFailed(error.message);
  }
}

helloWorld();
