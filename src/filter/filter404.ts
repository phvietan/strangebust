import { log } from "@drstrain/drutil";
import { AxiosResponse } from "axios";

export function filter404(responses: AxiosResponse[]): AxiosResponse[] {
  log(`Found ${responses.length} responses, filtering ...`);
  const filtered404 = responses.filter(
    (res) => res.status !== 404 && res.status !== 429,
  );
  this.logger.log(
    `After filter 404 status code: 0/${filtered404.length}`,
  );
  return filtered404;
}