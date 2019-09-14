// src/index.ts
import * as core from '@actions/core';

async function helloWorld(): Promise<void> {
  try {
    const input1 = core.getInput('input-1');
    console.log(`Input #1 is set to ${input1}`)
    const time = new Date().toTimeString();
    core.setOutput('time', time);
  } catch (error) {
    core.setFailed(error.message);
  }
}

helloWorld();
