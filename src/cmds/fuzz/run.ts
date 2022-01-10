import fs from 'fs';
import { sendPayloads } from "../../libs/sender/sender";
import { filter } from '../../libs/filter/filter';
import { BustOption } from '../../types';
import { setBustOpt } from '../../libs/bust';
import { logBust } from '../../libs/logBust';

export async function runOne(argv: BustOption) {
  setBustOpt(argv);
  logBust('=================================', true);
  logBust(`Fuzzing ${argv.url}:`, true);
  const [randomResp, resps] = await sendPayloads();
  filter(randomResp, resps);
}

export async function runMultiple(argv: BustOption, file: string) {
  const content = fs.readFileSync(file, 'utf-8').trim();
  const urls = content.split('\n');
  for (let i = 0; i < urls.length; i += 1) {
    argv.url = urls[i];
    await runOne(argv);
  }
}
