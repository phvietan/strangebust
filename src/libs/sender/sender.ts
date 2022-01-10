import { AxiosResponse } from "axios";
import { getAllRequestOptions } from "./getAllRequestOptions";
import { sendOneRequest } from "./sendOneRequest";
import { errorLogBust, logBust } from "../logBust";
import { sendAllRequests } from "./sendAllRequests";
import { exit } from "process";

export async function sendPayloads(): Promise<[AxiosResponse, AxiosResponse[]]> {
  const requestsOptions = getAllRequestOptions();
  const randomPathRequest = requestsOptions[0];
  const payloadRequests = requestsOptions.slice(1);

  logBust('Sending one random path request to collect 404 page');
  const responseRandom = await sendOneRequest(randomPathRequest);
  if (responseRandom === null) {
    errorLogBust('Got error when request random 404 page', true);
    exit(1);
  }

  logBust(`Sending requests with ${payloadRequests.length} payloads`);
  const resps = await sendAllRequests(payloadRequests);
  logBust(`Done ${requestsOptions.length}/${requestsOptions.length}: ${requestsOptions[0].baseURL}`);
  return [responseRandom, resps];
}
