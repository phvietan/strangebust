import { successLog } from '@drstrain/drutil';
import fs from 'fs';
import path from 'path';
import { CacheOption } from '../types';

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

export function readCacheOptions(): CacheOption {
  initCache();
  return require(cacheFileLoc);
}

export function setCacheOptions(newCacheOption: CacheOption): void {
  const cacheOption = readCacheOptions();
  fs.writeFileSync(
    cacheFileLoc,
    JSON.stringify({
      ...cacheOption,
      ...newCacheOption,
    }),
  );
}