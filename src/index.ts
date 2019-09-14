// src/index.ts
import { setOutput, getInput } from '@actions/core';
import { resolve, parse } from 'path';
import { sync } from 'glob';
import { readdir } from 'fs-extra'
import run from './run'

async function helloWorld(): Promise<void> {
  const filenames = sync(`${process.env.GITHUB_WORKSPACE}/**/package.json`);
  
  for (const filename of filenames) {
    await run(`npm install`, { cwd: parse(filename).dir })
    await run(`npm test`)
  }

  const input1 = getInput('input-1');
  console.log(`Input #1 is set to ${input1}`);
}

helloWorld();
