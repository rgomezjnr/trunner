import { exec } from 'child_process';
import { execSync } from 'child_process';
import { spawn } from 'child_process';
import { ArgumentParser } from 'argparse';
import fs from 'fs';
import capabilities from './capabilities.json';

const defaultArgs = ['wdio', 'run', 'wdio.conf.ts'];

// Setup argparser
const parser = new ArgumentParser({
  description: 'trunner'
});

// parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-a', '--app', { type: 'string', help: 'App under test, .ipa or .apk' });
parser.add_argument('-l', '--loglevel', { type: 'string', help: 'loglevel' });
parser.add_argument('-i', '--incognito', { action: 'store_true', help: 'incognito mode' });

const args = parser.parse_args();
console.log(args);

let wdioCapabilities = {};

if (args.loglevel !== undefined) {
  defaultArgs.push('--loglevel')
  defaultArgs.push(args.loglevel)
}

// Convert trunner args to WebdriverIO capabilities
if (args.app !== undefined) {
  wdioCapabilities = {
    'appium:app': args.app
  }
}

if (args.incognito) {
  wdioCapabilities = {
    'goog:chromeOptions': {
      args: ['incognito']
    }
  }
}

// Write final capabilities to capabilities.json
let finalCapabilties = {
  ...capabilities,
  ...wdioCapabilities
}

console.log(JSON.stringify(finalCapabilties));

fs.writeFileSync('./capabilities.json', JSON.stringify(finalCapabilties));

// Execute test(s)
console.log('Executing the following command...');
  console.log('npx');
for (let i = 0; i < defaultArgs.length; i++)
  console.log(defaultArgs[i]);
console.log();

const command = spawn('npx', defaultArgs);

command.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

command.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

command.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
