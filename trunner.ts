import { spawn } from 'child_process';
import { ArgumentParser } from 'argparse';
import fs from 'fs';
import capabilities from './capabilities.json';

const defaultArgs = ['wdio', 'run', 'wdio.conf.ts'];

// Setup argparser
const parser = new ArgumentParser({
  description: 'Test runner for WebdriverIO for quickly executing tests with different capabilities on the command-line'
});

parser.add_argument('-v', '--version', { action: 'version', version:'%(prog)s 0.1.0' });
parser.add_argument('-a', '--app', { type: 'string', help: 'App under test, .ipa or .apk' });
parser.add_argument('-l', '--logLevel', { type: 'string', help: 'level of logging verbosity [choices: "trace", "debug", "info", "warn", "error", "silent"]' });
parser.add_argument('-i', '--incognito', { action: 'store_true', help: 'incognito mode' });
parser.add_argument('-f', '--fullreset', { type: 'string', help: 'Perform a complete reset [choices: "true", "false"]' });
parser.add_argument('-n', '--noreset', { type: 'string', help: 'noReset' });
parser.add_argument('-s', '--spec', { type: 'string', help: 'run only a certain spec file - overrides specs piped from stdin [array]' });
parser.add_argument('-su', '--suite', { type: 'string', help: 'overwrites the specs attribute and runs the defined suite [array]' });
parser.add_argument('-b', '--bail', { type: 'int', help: 'stop test runner after specific amount of tests have failed [number]' });
parser.add_argument('-w', '--waitforTimeout', { type: 'int', help: 'timeout for all waitForXXX commands [number]' });
parser.add_argument('-p', '--platformName', { type: 'string', help: 'The type of platform hosting the app or browser [string]' });
parser.add_argument('-an', '--automationName', { type: 'string', help: 'The name of the Appium driver to use [string]' });
parser.add_argument('-d', '--deviceName', { type: 'string', help: 'The name of a particular device to automate [string]' });
parser.add_argument('-pv', '--platformVersion', { type: 'string', help: 'The version of a platform, e.g., for iOS, 16.0 [string]' });
parser.add_argument('-nct', '--newCommandTimeout', { type: 'int', help: 'The number of seconds the Appium server should wait for clients to send commands before deciding that the client has gone away and the session should shut down [number]' });
parser.add_argument('-u', '--udid', { type: 'string', help: 'Unique device identifier of the connected physical device [string]' });

const args = parser.parse_args();
console.log(args);

let wdioCapabilities = {};

if (args.logLevel !== undefined) {
  defaultArgs.push('--logLevel')
  defaultArgs.push(args.logLevel)
}

if (args.spec !== undefined) {
  defaultArgs.push('--spec')
  defaultArgs.push(args.spec)
}

if (args.suite !== undefined) {
  defaultArgs.push('--suite')
  defaultArgs.push(args.suite)
}

if (args.bail !== undefined) {
  defaultArgs.push('--bail')
  defaultArgs.push(args.bail)
}

if (args.waitforTimeout !== undefined) {
  defaultArgs.push('--waitforTimeout')
  defaultArgs.push(args.waitforTimeout)
}

// Convert trunner args to WebdriverIO capabilities
if (args.app !== undefined) {
  wdioCapabilities = {
    'appium:app': args.app
  }
}

if (args.fullreset !== undefined) {
  wdioCapabilities = {
    'appium:fullreset': args.fullreset
  }
}

if (args.noreset !== undefined) {
  wdioCapabilities = {
    'appium:noreset': args.noreset
  }
}

if (args.incognito) {
  wdioCapabilities = {
    'goog:chromeOptions': {
      args: ['incognito']
    }
  }
}

if (args.platformName !== undefined) {
  wdioCapabilities = {
    'appium:platformName': args.platformName
  }
}

if (args.automationName !== undefined) {
  wdioCapabilities = {
    'appium:automationName': args.automationName
  }
}

if (args.deviceName !== undefined) {
  wdioCapabilities = {
    'appium:deviceName': args.deviceName
  }
}

if (args.platformVersion !== undefined) {
  wdioCapabilities = {
    'appium:platformVersion': args.platformVersion
  }
}

if (args.newCommandTimeout !== undefined) {
  wdioCapabilities = {
    'appium:newCommandTimeout': args.newCommandTimeout
  }
}

if (args.udid !== undefined) {
  wdioCapabilities = {
    'appium:udid': args.udid
  }
}

// Write final capabilities to capabilities.json
let finalCapabilties = {
  ...capabilities,
  ...wdioCapabilities
}

console.log(JSON.stringify(finalCapabilties));

fs.writeFileSync('./capabilities.json', JSON.stringify(finalCapabilties));

let defaultArgsString = '';

for (let i = 0; i < defaultArgs.length; i++)
  defaultArgsString += `${defaultArgs[i]} `;

console.log('Executing the following command...');
console.log(`npx ${defaultArgsString}`);

console.log();

// Execute test(s)
spawn('npx', defaultArgs, {stdio: "inherit"});
