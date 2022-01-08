import { isString } from '@drstrain/drutil';
import { BustOption } from '../types';
import yargs from 'yargs';
import { setBustOpt } from 'libs/bust';

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
      demandOption: true,
    })
    .option('output', {
      alias: 'o',
      describe: 'Choose place to store output, will be stdout if not specified',
      type: 'string',
      default: '',
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
    .option('verbose', {
      describe: 'Run fuzzer verbosely',
      type: 'boolean',
      default: false,
    })
    .option('async', {
      describe: 'Number of async requests',
      type: 'number',
      default: 5,
    })
    .option('sleep', {
      describe: 'Sleep for some miliseconds between requests',
      type: 'number',
      default: 100,
    })
    .option('wordlist', {
      alias: 'w',
      describe: 'Wordlist file to start fuzzing',
      type: 'string',
      default: './wordlist.txt',
    })
    .help().argv as any;

  argv.header = argv.header || [];
  if (isString(argv.header)) {
    const header = (argv.header as any) as string;
    argv.header = [header];
  }

  setBustOpt(argv);
  await send(argv);
}
