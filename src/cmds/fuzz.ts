import { isString } from '@drstrain/drutil';
import { BustOption } from '../types';
import yargs from 'yargs';
import { setBustOpt } from '../libs/bust';
import { sendPayloads } from '../libs/sender/sender';
import { filter } from '../libs/filter/filter';

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

  setBustOpt(argv);
  const [randomResp, resps] = await sendPayloads();
  filter(randomResp, resps);
}
