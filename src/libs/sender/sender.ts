import { AxiosResponse } from "axios";
import { getAllRequestOptions } from "./getAllRequestOptions";
import { sendOneRequest } from "./sendOneRequest";
import { errorLogVerbose, logVerbose } from "../logVerbose";
import { sendAllRequests } from "./sendAllRequests";
import { exit } from "process";

export async function sendPayloads(): Promise<[AxiosResponse, AxiosResponse[]]> {
  const requestsOptions = getAllRequestOptions();
  const randomPathRequest = requestsOptions[0];
  const payloadRequests = requestsOptions.slice(1);

  logVerbose('Sending one random path request to collect 404 page');
  const responseRandom = await sendOneRequest(randomPathRequest);
  if (responseRandom === null) {
    errorLogVerbose('Got error when request random 404 page', true);
    exit(1);
  }

  logVerbose(`Sending requests with ${payloadRequests.length} payloads`);
  const resps = await sendAllRequests(payloadRequests);
  logVerbose(`Done ${requestsOptions.length}/${requestsOptions.length}: ${requestsOptions[0].baseURL}`);
  return [responseRandom, resps];
}
