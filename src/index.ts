#!/usr/bin/env node

import { exit } from 'process';
import { initHandler, fuzzHandler, checkHandler } from './cmds';

function printHelp() {
  const { argv } = process;
  const paths = argv[1].split('/');
  const bin = paths[paths.length - 1];

  const help =
    `Usage: ${bin} <command>

Commands:
    ${bin} run      Run strangebust
    ${bin} init     Set cached options, you don't need to set the options again
    ${bin} check    Check current cached options

You need at least one command before moving on
`;
  console.log(help);
}

async function main() {
  const { argv } = process;
  const parsedArgv = argv.slice(3);
  const command = argv[2];
  switch (command) {
    case 'init':
      await initHandler(parsedArgv);
      break;
    case 'check':
      await checkHandler(parsedArgv);
      break
    case 'run':
      await fuzzHandler(parsedArgv);
      break;
    default:
      printHelp();
  }
  exit(0);
}

main();
