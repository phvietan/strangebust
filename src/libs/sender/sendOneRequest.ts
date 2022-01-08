import { errorLog } from "@drstrain/drutil";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
      errorLog('WTF error in config? ' + error.message);
      return null;
    }
  }
}
