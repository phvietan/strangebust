import { AxiosRequestConfig, Method } from "axios";
import { getBustOpt } from "../bust";
import { parseHeaderMap } from "./parseHeaderMap";

export function getOneRequestOption(wordlistPath: string): AxiosRequestConfig {
  const bustOption = getBustOpt();
  const u = new URL(bustOption.url);
  const currentPath = u.pathname;
  const path =
    currentPath[currentPath.length - 1] === '/'
      ? currentPath
      : currentPath + '/';
  return {
    method: bustOption.method as Method,
    withCredentials: true,
    responseType: 'text',
    transformResponse: [(data) => data],
    baseURL: u.origin,
    url: path + wordlistPath,
    timeout: bustOption.timeout,
    headers: parseHeaderMap(bustOption.header),
  };
}
