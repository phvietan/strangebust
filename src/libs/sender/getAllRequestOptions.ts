import { getRandomString } from "@drstrain/drutil";
import { AxiosRequestConfig } from "axios";
import { readWordlistFile } from "../readWordlist";
import { getOneRequestOption } from "./getOneRequestOption";

export function getAllRequestOptions(): AxiosRequestConfig[] {
  const wordlistFile = readWordlistFile();
  const opts = wordlistFile.map(w => getOneRequestOption(w));
  opts.push(getOneRequestOption(getRandomString(32)));
  [opts[0], opts[opts.length - 1]] = [opts[opts.length - 1], opts[0]]; // Make the first option as the random path (404 request)
  return opts;
}
