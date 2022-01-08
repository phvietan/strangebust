import { AxiosResponse } from 'axios';
import { errorLog, log } from '@drstrain/drutil';

import { filter404 } from './filter404';
import { filterCaptcha } from './filterCaptcha';
import { filterSimilar404 } from './filterSimilarity';
import { filterDominantStatusCode } from './filterDominantStatus';

import { getBustOpt } from '../../types/bustOption';

export async function filter(response404: AxiosResponse, responses: AxiosResponse[]) {
  const bustOpt = getBustOpt();
  const qualified = [];

  log(`Found ${responses.length} responses, filtering ...`);
  const { dirty: dirtyFiltered404 } = filter404(responses);
  log(`After filter 404 status code: 0/${dirtyFiltered404.length}`);

  const { qualified: qualifiedDominant, dirty: dirtyDominant } = filterDominantStatusCode(dirtyFiltered404);
  qualified.push(...qualifiedDominant);
  log(`After filter dominant status code: ${qualified.length}`);

  const { qualified: qualifiedSimilar404 } = filterSimilar404(response404, dirtyDominant);
  qualified.push(...qualifiedSimilar404);
  log(`After filter 404 similarity, ${qualified.length}`);

  const [finalQualified, hasCaptcha] = filterCaptcha(qualified);
  if (hasCaptcha) {
    errorLog(`CAPTCHA detected, please check again ${bustOpt.url}`);
  }
  log(`Result is ${finalQualified.length}`);
  log(`Result is: ${finalQualified.map((q) => q.config.url).toString()}`);
  return this.qualified;
}
