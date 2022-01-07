import { AxiosResponse } from "axios";
import { contentSimilarityScore } from "../lib/contentSimilarity";
import { FilterResult } from "../types";

export function filterSimilar404(
  response404Data: AxiosResponse, 
  dirtyResponses: AxiosResponse[],
): FilterResult {
  const qualified = [];
  const dirty = dirtyResponses.forEach((res) => {
    const score = contentSimilarityScore(res.data, response404Data.data);
    if (score < 50) qualified.push(res);
  });
}