// src/index.ts
import { setOutput, getInput } from '@actions/core';
import glob from 'glob'
import { resolve } from 'path'

async function helloWorld(): Promise<void> {
    const input1 = getInput('input-1'); 
    console.log(`Input #1 is set to ${input1}`)
}

const filenames = glob.sync(resolve(`${process.env.GITHUB_WORKSPACE}`))
for (const filename of filenames) {
  console.log(filename)
}

helloWorld();
