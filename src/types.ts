import { AxiosResponse } from "axios"

export type BustOption = {
  url: string,
  output: string,
  header: string[],
  data: string,
  method: string,
  async: number,
  sleep: number,
}

export type FilterResult = {
  dirty: AxiosResponse[], // Responses that still dirty, need to filter more
  qualified: AxiosResponse[], // Responses that is qualified as strange, will output these responses
}