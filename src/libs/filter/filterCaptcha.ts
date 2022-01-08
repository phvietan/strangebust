import { AxiosResponse } from "axios";
import { errorLogVerbose } from "../logVerbose";
import { contentSimilarityScore } from "./similarity";

var THRESHOLD_CAPTCHA_CHECK = 33 / 100; // 33%

// If we reach captcha, our response will now be filled with lots of captcha page, so this is last filter
export function filterCaptcha(qualifiedBefore: AxiosResponse[]): AxiosResponse[] {
  const threshold = THRESHOLD_CAPTCHA_CHECK * qualifiedBefore.length;
  const checkbox = new Array(qualifiedBefore.length).fill(true);
  for (let i = qualifiedBefore.length - 1; i >= 0; --i) {
    let matched = 0;
    for (let j = 0; j < qualifiedBefore.length; ++j) {
      if (i === j) continue;
      const score = contentSimilarityScore(
        qualifiedBefore[j].data,
        qualifiedBefore[i].data,
      );
      matched += +(score > 50);
    }
    if (matched > threshold) checkbox[i] = false;
  }
  const qualified = qualifiedBefore.filter((_, index) => checkbox[index]);
  if (qualified.length !== qualifiedBefore.length) {
    errorLogVerbose(`CAPTCHA detected because the following response looks so alike, please check again:`);
    qualifiedBefore.forEach((q, index) => {
      if (!checkbox[index]) errorLogVerbose(`[CAPTCHA]: ${q.config.baseURL}${q.config.url}`);
    });
  }
  return qualified;
}
