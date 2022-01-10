import fs from 'fs';
import { errorLog, isString } from '@drstrain/drutil';
import { BustOption } from '../types';
import yargs from 'yargs';
import { setBustOpt } from '../libs/bust';
import { runMultiple, runOne } from './fuzz/run';
import { exit } from 'process';

export async function fuzzHandler(args: string[]) {
  const argv: BustOption = yargs(args)
    .option('method', {
      alias: 'X',
      describe: 'Method for path fuzzing, please refer to `require(\'http\').METHODS` for NodeJS supported methods',
      type: 'string',
      default: 'GET',
    })
    .option('url', {
      alias: 'u',
      describe: 'URL for path fuzzing',
      type: 'string',
    })
    .option('header', {
      describe: 'Header to include in request, you may include multiple header',
      type: 'string',
      default: null,
    })
    .option('data', {
      alias: 'd',
      describe: 'Body to include in path fuzzing',
      type: 'string',
      default: '',
    }).alias('h', 'help')
    .option('file', {
      alias: 'f',
      describe: 'Run fuzz on URLs in <filename>, newline seperated',
      type: 'string',
    })
    .option('output', {
      alias: 'o',
      describe: 'Choose place to store output, will be stdout if not specified',
      type: 'string',
      default: '',
    })
    .option('verbose', {
      describe: 'Run fuzzer verbosely (default true)',
      type: 'boolean',
    })
    .option('async', {
      describe: 'Number of async requests (default 5)',
      type: 'number',
    })
    .option('sleep', {
      describe: 'Sleep for some miliseconds between requests (default 100ms)',
      type: 'number',
    })
    .option('timeout', {
      alias: 't',
      describe: 'Timeout in ms for each request (default 5000ms)',
      type: 'number',
    })
    .option('wordlist', {
      alias: 'w',
      describe: 'Wordlist file to start fuzzing (default ~/wordlists/dir.txt)',
      type: 'string',
    })
    .help().argv as any;

  argv.header = argv.header || [];
  if (isString(argv.header)) {
    const header = (argv.header as any) as string;
    argv.header = [header];
  }

  const { file, url } = argv;
  if (!file && !url) {
    errorLog('ERROR: Must specify option --file <filename> or --url <url> to run');
    exit(1);
  }
  if (file) {
    if (!fs.existsSync(file)) {
      errorLog(`ERROR: ${file} not found`);
      exit(1);
    }
    await runMultiple(argv, file);
  } else {
    await runOne(argv);
  }
}
