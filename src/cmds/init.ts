import path from 'path';
import yargs from "yargs";
import { readCacheOptions, setCacheOptions } from "../libs/cache";
import { successLog } from "@drstrain/drutil";

export function initHandler(args: string[]) {
  let argv = yargs(args)
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
    .option('wordlist', {
      alias: 'w',
      describe: 'Wordlist file to start fuzzing (default ~/wordlists/dir.txt)',
      type: 'string',
    })
    .option('timeout', {
      alias: 't',
      describe: 'Timeout in ms for each request (default 5000ms)',
      type: 'number',
    })
    .help().argv as any;

  if (argv.wordlist) {
    argv.wordlist = path.resolve(argv.wordlist);
  }

  argv = {
    verbose: argv.verbose,
    async: argv.async,
    sleep: argv.sleep,
    wordlist: argv.wordlist,
    timeout: argv.timeout,
  }
  if (!argv.verbose) delete argv.verbose;
  if (!argv.async) delete argv.async;
  if (!argv.sleep) delete argv.sleep;
  if (!argv.wordlist) delete argv.wordlist;
  if (!argv.timeout) delete argv.timeout;
  setCacheOptions(argv);
  successLog('Successfully load new argument to cache');
  const cacheOptions = readCacheOptions();
  console.log(cacheOptions);
}
