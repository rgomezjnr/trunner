import { exec } from 'child_process';
import { execSync } from 'child_process';
import { spawn } from 'child_process';

console.log('arg count:');
console.log(process.argv.length);
console.log();

console.log('argv:');
for (let i = 0; i < process.argv.length; i++)
  console.log(process.argv[i]);
console.log();

const args = ['wdio', 'run'];

args.push(process.argv[2]);

console.log('Executing the following command...');
  console.log('npx');
for (let i = 0; i < args.length; i++)
  console.log(args[i]);
console.log();

const command = spawn('npx', args);

command.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

command.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

command.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
