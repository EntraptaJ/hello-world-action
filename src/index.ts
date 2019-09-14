// src/index.ts
import * as core from '@actions/core';
import * as github from '@actions/github';

async function helloWorld(): Promise<void> {
  try {
    const input1 = core.getInput('input-1');
    console.log(`Input #1 is set to ${input1}`)
    const time = new Date().toTimeString();
    core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

helloWorld();
