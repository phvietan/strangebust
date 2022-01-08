import { CacheOption } from "./cacheOption";

export interface BustOption extends CacheOption {
  url: string,
  output: string,
  header: string[],
  data: string,
  method: string,
}
