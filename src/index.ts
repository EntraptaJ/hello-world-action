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
        const stuff = await octokit.issues.createComment({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          issue_number: pr.number,
          body: 'Hello World',
        });
        console.log(`Hello `, stuff)
        setFailed('TEST FAILED');
      }
    }

    const input1 = getInput('input-1');
    console.log(`Input #1 is set to ${input1}`);
  } catch (error) {
    setFailed(error.message);
  }
}

helloWorld();
