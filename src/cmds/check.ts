import fs from 'fs';
import { errorLog, log, successLog } from "@drstrain/drutil";
import { readCacheOptions } from "../libs/cache";

export async function checkHandler(args: string[]) {
  log('Checking cache config:');
  const cacheOpt = readCacheOptions();
  console.log(cacheOpt);
  const { wordlist } = cacheOpt;
  if (fs.existsSync(wordlist)) {
    successLog(`Successfully loaded wordlist at ${wordlist}`);
  } else {
    errorLog(`Error when load wordlist at ${wordlist}: file not found`);
  }
}
