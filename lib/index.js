"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
async function helloWorld() {
    try {
        const input1 = core.getInput('input-1');
        console.log(`Input #1 is set to ${input1}`);
        const time = new Date().toTimeString();
        core.setOutput('time', time);
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`The event payload: ${payload}`);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
helloWorld();
