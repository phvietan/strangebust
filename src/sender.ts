import axios, { AxiosRequestConfig, AxiosError } from "axios";

export async function sendOneRequest(opt: AxiosRequestConfig) {
  try {
    const resp = await axios.request(opt);
    return resp;
  } catch (err: any) {
    const error = err as AxiosError;
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    if (error.response) {
      const { response } = error;
      return response;
    } else if (error.request) {
      // The request was made but no response was received
      return null;
    } else {
      // Something happened in setting up the request that triggered an Error
      this.logger.log('WTF error in config? ' + error.message);
      return null;
    }
  }
}

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
      return this.sendOneRequest(opt);
    },
    { concurrency: this.options.asyncRequest },
  );
}

async prepareAndSendAll(
  packet: PacketRequest,
  currentPath: string,
): Promise<[AxiosResponse[], Error]> {
  const requestsOptions = this.prepare(packet, currentPath);
  const randomPathRequest = requestsOptions[0];
  const payloadRequests = requestsOptions.slice(1);

  const responseRandom = await this.sendOneRequest(randomPathRequest);
  if (responseRandom === null) {
    return [[], new Error('Got error when GET random 404 page')];
  }

  const resps = await this.sendAllRequests(payloadRequests);
  this.logger.log(
    `Done ${requestsOptions.length}/${requestsOptions.length}: ${requestsOptions[0].baseURL}`,
  );
  return [resps, null];
}