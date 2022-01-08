import { AxiosResponse } from 'axios';
import { filter404 } from './filter404';
import { filterCaptcha } from './filterCaptcha';
import { filterSimilar404 } from './filterSimilarity';
import { filterDominantStatusCode } from './filterDominantStatus';

import { logVerbose } from '../logVerbose';

export async function filter(response404: AxiosResponse, responses: AxiosResponse[]) {
  const qualified = [];

  logVerbose(`Found ${responses.length} responses, filtering ...`);
  const { dirty: dirtyFiltered404 } = filter404(responses);
  logVerbose(`After filter 404 status code: 0/${dirtyFiltered404.length}`);

  const { qualified: qualifiedDominant, dirty: dirtyDominant } = filterDominantStatusCode(dirtyFiltered404);
  qualified.push(...qualifiedDominant);
  logVerbose(`After filter dominant status code: ${qualified.length}`);

  const { qualified: qualifiedSimilar404 } = filterSimilar404(response404, dirtyDominant);
  qualified.push(...qualifiedSimilar404);
  logVerbose(`After filter 404 similarity, ${qualified.length}`);

  const finalQualified = filterCaptcha(qualified);

  logVerbose(`Found ${finalQualified.length} results:`, true);
  finalQualified.forEach(res => {
    logVerbose(`${res.config.baseURL}${res.config.url}`, true);
  });
  return this.qualified;
}
