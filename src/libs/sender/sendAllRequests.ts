import { sleep } from "@drstrain/drutil";
import { AxiosRequestConfig } from "axios";
import Bluebird from "bluebird";
import { logBust } from "../logBust";
import { getBustOpt } from "../bust";
import { sendOneRequest } from "./sendOneRequest";

export async function sendAllRequests(requestsOptions: AxiosRequestConfig[]) {
  let cnt = 0;
  const { async, sleep: sleepMs } = getBustOpt();
  return Bluebird.map(
    requestsOptions,
    async (opt) => {
      await sleep(sleepMs);
      cnt += 1;
      if (cnt % 50 === 0) {
        logBust(`Done ${cnt}/${requestsOptions.length}: ${opt.baseURL}${opt.url}`);
      }
      return sendOneRequest(opt);
    },
    { concurrency: async },
  );
}
