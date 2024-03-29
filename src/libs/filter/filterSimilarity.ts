import { AxiosResponse } from "axios";
import { contentSimilarityScore } from "./similarity";
import { FilterResult } from "../../types";

export function filterSimilar404(
  response404Data: AxiosResponse,
  dirtyResponses: AxiosResponse[],
): FilterResult {
  const qualified = [];
  const dirty = dirtyResponses.map((res) => {
    const score = contentSimilarityScore(res.data, response404Data.data);
    if (score < 50) {
      qualified.push(res);
      return null;
    } else {
      return res;
    }
  }).filter(d => d !== null);

  return {
    dirty,
    qualified,
  }
}
