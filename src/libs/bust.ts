import { BustOption } from "../types";
import { readCacheOptions } from "./cache";

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
  timeout: 5000,
}

export function getBustOpt(): BustOption {
  return bustOpt;
}

export function setBustOpt(newBustOpt: BustOption): void {
  const cacheOptions = readCacheOptions();
  bustOpt = {
    ...cacheOptions,
    ...newBustOpt,
  };
}