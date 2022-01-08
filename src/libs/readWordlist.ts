import fs from 'fs';
import { getBustOpt } from "./bust";

var wordlistFile = null;

export function readWordlistFile(): string[] {
  if (!wordlistFile) {
    const { wordlist } = getBustOpt();
    const content = fs.readFileSync(wordlist, 'utf-8').trim();
    wordlistFile = content.split('\n');
  }
  return wordlistFile;
}
