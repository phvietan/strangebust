import { AxiosResponse } from 'axios';
import { log } from '@drstrain/drutil';
import { FilterResult } from 'types';
import { filter404 } from 'filter/filter404';

var THRESHOLD_STATUS_CODE = 10 / 100; // 10%

function filterDominantStatusCode(responses: AxiosResponse[]): FilterResult {
  const count: Record<number, any> = {};
  let maxFreq = 0;
  let rememberStatusCode = -1;
  responses.forEach((res) => {
    count[res.status] = (count[res.status] || 0) + 1;
    if (maxFreq < count[res.status]) {
      maxFreq = count[res.status];
      rememberStatusCode = res.status;
    }
  });

  const qualified = [];
  const dirty = responses.map((res) => {
    if (count[res.status] < responses.length * THRESHOLD_STATUS_CODE) {
      qualified.push(res);
      return null;
    }
    return res;
  }).filter((res) => res !== null);
  log(
    `After filter dominant status code, ${qualified.length}/${responses.length}`,
  );
  return {
    qualified,
    dirty,
  }
}

function filterCaptcha() {
  // If we reach captcha, our response will now be filled with lots of captcha page, so this is last filter
  const threshold = Math.floor(0.33 * this.qualified.length);
  const checkbox = new Array(this.qualified.length).fill(true);
  for (let i = this.qualified.length - 1; i >= 0; --i) {
    let matched = 0;
    for (let j = 0; j < this.qualified.length; ++j) {
      if (i === j) continue;
      const score = contentSimilarityScore(
        this.qualified[j].data,
        this.qualified[i].data,
      );
      matched += +(score > 50);
    }
    if (matched > threshold) {
      checkbox[i] = false;
    }
  }
  this.qualified = this.qualified.filter((_, index) => checkbox[index]);
  this.logger.log(`After captcha, ${this.qualified.length}`);
}

export async function filter(response404: AxiosResponse, responses: AxiosResponse[]) {
  responses = filter404(responses);
  let filteredDominant = filterDominantStatusCode(responses);
  let { qualified } = filteredDominant;
  responses = filteredDominant.dirty;

  let filteredSimilar404 = filterSimilar404(response404, responses);

  this.logger.log(`After filter 404 similarity, ${qualified.length}`);


  this.filterCaptcha();
  this.logger.log(
    `Result is: ${this.qualified.map((q) => q.config.url).toString()}`,
  );
  return this.qualified;
}