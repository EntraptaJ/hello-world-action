(function () {
// ASSET: ../node_modules/@actions/core/lib/command.js
var $op$exports = {};
Object.defineProperty($op$exports, "__esModule", {
  value: true
});

const $op$var$os = require("os");
/**
 * Commands
 *
 * Command Format:
 *   ##[name key=value;key=value]message
 *
 * Examples:
 *   ##[warning]This is the user warning message
 *   ##[set-secret name=mypassword]definitelyNotAPassword!
 */


function $op$var$issueCommand(command, properties, message) {
  const cmd = new $op$var$Command(command, properties, message);
  process.stdout.write(cmd.toString() + $op$var$os.EOL);
}

var $op$export$issueCommand = $op$var$issueCommand;
$op$exports.issueCommand = $op$export$issueCommand;

function $op$var$issue(name, message = '') {
  $op$var$issueCommand(name, {}, message);
}

var $op$export$issue = $op$var$issue;
$op$exports.issue = $op$export$issue;
const $op$var$CMD_PREFIX = '##[';

class $op$var$Command {
  constructor(command, properties, message) {
    if (!command) {
      command = 'missing.command';
    }

    this.command = command;
    this.properties = properties;
    this.message = message;
  }

  toString() {
    let cmdStr = $op$var$CMD_PREFIX + this.command;

    if (this.properties && Object.keys(this.properties).length > 0) {
      cmdStr += ' ';

      for (const key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
          const val = this.properties[key];

          if (val) {
            // safely append the val - avoid blowing up when attempting to
            // call .replace() if message is not a string for some reason
            cmdStr += `${key}=${$op$var$escape(`${val || ''}`)};`;
          }
        }
      }
    }

    cmdStr += ']'; // safely append the message - avoid blowing up when attempting to
    // call .replace() if message is not a string for some reason

    const message = `${this.message || ''}`;
    cmdStr += $op$var$escapeData(message);
    return cmdStr;
  }

}

function $op$var$escapeData(s) {
  return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}

function $op$var$escape(s) {
  return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/]/g, '%5D').replace(/;/g, '%3B');
} //# sourceMappingURL=command.js.map


// ASSET: ../node_modules/@actions/core/lib/core.js
var $RNev$export$ExitCode,
    $RNev$exports = {};

var $RNev$var$__awaiter = $RNev$exports && $RNev$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty($RNev$exports, "__esModule", {
  value: true
});

const $RNev$var$path = require("path");
/**
 * The code to exit an action
 */


var $RNev$var$ExitCode;

(function (ExitCode) {
  /**
   * A code indicating that the action was successful
   */
  ExitCode[ExitCode["Success"] = 0] = "Success";
  /**
   * A code indicating that the action was a failure
   */

  ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($RNev$var$ExitCode = $RNev$export$ExitCode || ($RNev$export$ExitCode = {}, $RNev$exports.ExitCode = $RNev$export$ExitCode)); //-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------

/**
 * sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */


function $RNev$var$exportVariable(name, val) {
  process.env[name] = val;
  $op$exports.issueCommand('set-env', {
    name
  }, val);
}

var $RNev$export$exportVariable = $RNev$var$exportVariable;
$RNev$exports.exportVariable = $RNev$export$exportVariable;
/**
 * exports the variable and registers a secret which will get masked from logs
 * @param name the name of the variable to set
 * @param val value of the secret
 */

function $RNev$var$exportSecret(name, val) {
  $RNev$var$exportVariable(name, val); // the runner will error with not implemented
  // leaving the function but raising the error earlier

  $op$exports.issueCommand('set-secret', {}, val);
  throw new Error('Not implemented.');
}

var $RNev$export$exportSecret = $RNev$var$exportSecret;
$RNev$exports.exportSecret = $RNev$export$exportSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */

function $RNev$var$addPath(inputPath) {
  $op$exports.issueCommand('add-path', {}, inputPath);
  process.env['PATH'] = `${inputPath}${$RNev$var$path.delimiter}${process.env['PATH']}`;
}

var $RNev$export$addPath = $RNev$var$addPath;
$RNev$exports.addPath = $RNev$export$addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */

function $RNev$var$getInput(name, options) {
  const val = process.env[`INPUT_${name.replace(' ', '_').toUpperCase()}`] || '';

  if (options && options.required && !val) {
    throw new Error(`Input required and not supplied: ${name}`);
  }

  return val.trim();
}

var $RNev$export$getInput = $RNev$var$getInput;
$RNev$exports.getInput = $RNev$export$getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */

function $RNev$var$setOutput(name, value) {
  $op$exports.issueCommand('set-output', {
    name
  }, value);
}

var $RNev$export$setOutput = $RNev$var$setOutput;
$RNev$exports.setOutput = $RNev$export$setOutput; //-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------

/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */

function $RNev$var$setFailed(message) {
  process.exitCode = $RNev$var$ExitCode.Failure;
  $RNev$var$error(message);
}

var $RNev$export$setFailed = $RNev$var$setFailed;
$RNev$exports.setFailed = $RNev$export$setFailed; //-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------

/**
 * Writes debug message to user log
 * @param message debug message
 */

function $RNev$var$debug(message) {
  $op$exports.issueCommand('debug', {}, message);
}

var $RNev$export$debug = $RNev$var$debug;
$RNev$exports.debug = $RNev$export$debug;
/**
 * Adds an error issue
 * @param message error issue message
 */

function $RNev$var$error(message) {
  $op$exports.issue('error', message);
}

var $RNev$export$error = $RNev$var$error;
$RNev$exports.error = $RNev$export$error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */

function $RNev$var$warning(message) {
  $op$exports.issue('warning', message);
}

var $RNev$export$warning = $RNev$var$warning;
$RNev$exports.warning = $RNev$export$warning;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */

function $RNev$var$startGroup(name) {
  $op$exports.issue('group', name);
}

var $RNev$export$startGroup = $RNev$var$startGroup;
$RNev$exports.startGroup = $RNev$export$startGroup;
/**
 * End an output group.
 */

function $RNev$var$endGroup() {
  $op$exports.issue('endgroup');
}

var $RNev$export$endGroup = $RNev$var$endGroup;
$RNev$exports.endGroup = $RNev$export$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */

function $RNev$var$group(name, fn) {
  return $RNev$var$__awaiter(this, void 0, void 0, function* () {
    $RNev$var$startGroup(name);
    let result;

    try {
      result = yield fn();
    } finally {
      $RNev$var$endGroup();
    }

    return result;
  });
}

var $RNev$export$group = $RNev$var$group;
$RNev$exports.group = $RNev$export$group; //# sourceMappingURL=core.js.map

// ASSET: index.ts
var $QCb$exports = {};
Object.defineProperty($QCb$exports, "__esModule", {
  value: true
}); // src/index.ts

async function $QCb$var$helloWorld() {
  const input1 = $RNev$export$getInput('input-1');
  console.log(`Input #1 is set to ${input1}`);
}

$QCb$var$helloWorld();

if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS
  module.exports = $QCb$exports;
} else if (typeof define === "function" && define.amd) {
  // RequireJS
  define(function () {
    return $QCb$exports;
  });
}
})();