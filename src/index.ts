// src/index.ts
import { getInput, setFailed,  } from '@actions/core';
import { sync } from 'glob';
import { parse } from 'path';
import run from './run';
import * as github from '@actions/github';

async function helloWorld(): Promise<void> {
  try {
    const filenames = sync(`${process.env.GITHUB_WORKSPACE}/**/package.json`);

    for (const filename of filenames) {
      await run(`npm install`, { cwd: parse(filename).dir });
      try {
        await run(`npm test`);
      } catch {
        console.log(github.context!.payload!.pull_request!)
        const Stuff = new github.GitHub(process.env.GITHUB_TOKEN);
        console.log(github.context)
        Stuff.issues.createComment({ ...github.context.issue, body: 'Hello World. Tests Failed'  })
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
