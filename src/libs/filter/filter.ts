import { AxiosResponse } from 'axios';
import { filter404 } from './filter404';
import { filterCaptcha } from './filterCaptcha';
import { filterSimilar404 } from './filterSimilarity';
import { filterDominantStatusCode } from './filterDominantStatus';

import { logBust } from '../logBust';

export async function filter(response404: AxiosResponse, responses: AxiosResponse[]) {
  const qualified = [];

  logBust(`Found ${responses.length} responses, filtering ...`);
  const { dirty: dirtyFiltered404 } = filter404(responses);
  logBust(`After filter 404 status code: 0/${dirtyFiltered404.length}`);

  const { qualified: qualifiedDominant, dirty: dirtyDominant } = filterDominantStatusCode(dirtyFiltered404);
  qualified.push(...qualifiedDominant);
  logBust(`After filter dominant status code: ${qualified.length}`);

  const { qualified: qualifiedSimilar404 } = filterSimilar404(response404, dirtyDominant);
  qualified.push(...qualifiedSimilar404);
  logBust(`After filter 404 similarity, ${qualified.length}`);

  const finalQualified = filterCaptcha(qualified);

  logBust(`Found ${finalQualified.length} results:`, true);
  finalQualified.forEach(res => {
    logBust(`${res.config.baseURL}${res.config.url}`, true);
  });
  return finalQualified;
}
