import fs from 'fs';
import path from 'path';
import { CacheOption } from '../types';
import { successLog } from '@drstrain/drutil';

export var cacheFileLoc = path.join(__dirname, '..', '..', '.cache.json');

const defaultOpt: CacheOption = {
  async: 5,
  sleep: 100,
  verbose: true,
  timeout: 5000,
  wordlist: path.join('~', 'wordlists', 'dir.txt'),
}

var cacheFile: CacheOption = null;

export function initCache() {
  if (!fs.existsSync(cacheFileLoc)) {
    fs.writeFileSync(cacheFileLoc, JSON.stringify(defaultOpt));
    successLog('Successfully init .cache.json file');
  }
}

export function readCacheOptions(): CacheOption {
  if (!cacheFile) {
    initCache();
    cacheFile = require(cacheFileLoc);
  }
  return cacheFile;
}

export function setCacheOptions(newCacheOption: CacheOption): void {
  const cacheOption = readCacheOptions();
  cacheFile = {
    ...defaultOpt,
    ...cacheOption,
    ...newCacheOption,
  }
  fs.writeFileSync(cacheFileLoc, JSON.stringify(cacheFile));
}
