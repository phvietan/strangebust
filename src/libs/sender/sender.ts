import Bluebird from "bluebird";
import { log, sleep } from '@drstrain/drutil';
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAllRequestOptions } from "./getAllRequestOptions";
import { sendOneRequest } from "./sendOneRequest";

export async function sendAllRequests(requestsOptions: AxiosRequestConfig[]) {
  let cnt = 0;
  return Bluebird.map(
    requestsOptions,
    async (opt) => {
      await sleep(this.options.sleepRequest);
      cnt += 1;
      if (cnt % 30 === 0) {
        this.logger.log(
          `Done ${cnt}/${requestsOptions.length}: ${opt.baseURL}${opt.url}`,
        );
      }
      return sendOneRequest(opt);
    },
    { concurrency: this.options.asyncRequest },
  );
}

export async function prepareAndSendAll(): Promise<[AxiosResponse[], Error]> {
  const requestsOptions = getAllRequestOptions();
  const randomPathRequest = requestsOptions[0];
  const payloadRequests = requestsOptions.slice(1);

  const responseRandom = await sendOneRequest(randomPathRequest);
  if (responseRandom === null) {
    return [[], new Error('Got error when GET random 404 page')];
  }

  const resps = await this.sendAllRequests(payloadRequests);
  log(`Done ${requestsOptions.length}/${requestsOptions.length}: ${requestsOptions[0].baseURL}`);
  return [resps, null];
}
