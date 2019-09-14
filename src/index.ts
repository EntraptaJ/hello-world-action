// src/index.ts
import { setOutput, getInput } from '@actions/core';

async function helloWorld(): Promise<void> {
    const input1 = getInput('input-1'); 
    console.log(`Input #1 is set to ${input1}`)
}

helloWorld();
