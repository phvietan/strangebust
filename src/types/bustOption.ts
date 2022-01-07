import { readCacheOptions } from "../libs/cache";
import { CacheOption } from "./cacheOption";

export interface BustOption extends CacheOption {
  url: string,
  output: string,
  header: string[],
  data: string,
  method: string,
}

var bustOpt: BustOption = {
  url: '',
  output: '',
  header: [],
  data: '',
  method: 'GET',
  async: 5,
  sleep: 100,
  wordlist: '',
  verbose: true,
}

export function getBustOpt(): BustOption {
  return bustOpt;
}

export function setBustOpt(newBustOpt: BustOption): void {
  const newOpt = Object.create(null);
  Object.assign(newOpt, newBustOpt);
  const cacheOptions = readCacheOptions();
  bustOpt = {
    ...cacheOptions,
    ...newOpt,
  };
}
