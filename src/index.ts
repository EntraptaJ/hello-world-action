// src/index.ts
import { setOutput, getInput } from '@actions/core';
import { resolve } from 'path';
import { sync } from 'glob';
import { readdir } from 'fs-extra'
import run from './run'

async function helloWorld(): Promise<void> {
  const filenames = sync(`${process.env.GITHUB_WORKSPACE}/**/*`);
  readdir(process.env.GITHUB_WORKSPACE, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });

  const input1 = getInput('input-1');
  console.log(`Input #1 is set to ${input1}`);
}

helloWorld();
