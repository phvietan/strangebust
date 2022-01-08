import { AxiosResponse } from "axios";
import { FilterResult } from "../../types";

export function filter404(responses: AxiosResponse[]): FilterResult {
  const filtered404 = responses.filter((res) => res && res.status !== 404 && res.status !== 429);
  return {
    qualified: [],
    dirty: filtered404,
  };
}
