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
    .help().argv as any;
  if ()
}
