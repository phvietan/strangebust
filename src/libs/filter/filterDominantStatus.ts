import { log } from '@drstrain/drutil';
import { AxiosResponse } from 'axios';
import { FilterResult } from '../../types';

var THRESHOLD_STATUS_CODE = 10 / 100; // 10%

export function filterDominantStatusCode(responses: AxiosResponse[]): FilterResult {
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
  return {
    qualified,
    dirty,
  }
}
