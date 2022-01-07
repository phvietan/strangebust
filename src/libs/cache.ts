import { successLog } from '@drstrain/drutil';
import fs from 'fs';
import path from 'path';

export var cacheFileLoc = path.join(__dirname, '..', '..', '.cache.json');

export function initCache() {
  if (!fs.existsSync(cacheFileLoc)) {
    const defaultOpt = {
      async: 5,
      sleep: 100,
      verbose: true,
      wordlist: path.join('~', 'wordlists', 'dir.txt'),
    }
    fs.writeFileSync(cacheFileLoc, JSON.stringify(defaultOpt));
    successLog('Successfully init .cache.json file');
  }
}

export function readCacheOptions() {
  initCache();
  return require(cacheFileLoc);
}
