import { setCacheOptions } from "../libs/cache";
import yargs from "yargs";

export function initHandler(args: string[]) {
  const argv = yargs(args)
    .option('verbose', {
      describe: 'Run fuzzer verbosely',
      type: 'boolean',
      default: true,
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
      default: '~/wordlists/dir.txt',
    })
    .option('timeout', {
      alias: 't',
      describe: 'Timeout in ms for each request',
      type: 'number',
      default: 5000,
    })
    .help().argv as any;
  setCacheOptions(argv);
}
